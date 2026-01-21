import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterDto } from './dtos/register.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';
import { JWTPayloadType } from 'utils/types';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'utils/enum';
import { UpdateRoleDto } from './dtos/update-role.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * Register a new user
   * @param registerDto data to register new user
   * @returns (Access Token)
   */
  public async register(registerDto: RegisterDto) {
    const { email, password, username } = registerDto;
    const userFromDb = await this.usersRepository.findOne({ where: { email } });
    if (userFromDb) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = this.usersRepository.create({
      email,
      username,
      password: hashedPassword,
    });

    newUser = await this.usersRepository.save(newUser);

    const accessToken = await this.generateJWT({ id: newUser.id, userType: newUser.role });

    return { accessToken };
  }

  /**
   * Login User
   * @param loginDto data to login to user account
   * @returns access token
   */
  public async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const userFromDb = await this.usersRepository.findOne({ where: { email } });
    if (!userFromDb) {
      throw new BadRequestException('Invalid credentials');
    }
    const isPasswordMatching = await bcrypt.compare(password, userFromDb.password);
    if (!isPasswordMatching) {
      throw new BadRequestException('Invalid credentials');
    }

    const accessToken = await this.generateJWT({ id: userFromDb.id, userType: userFromDb.role });
    
    return { accessToken };
  }

  /**
   * Get Current User (Logged in User)
   * @param id Id Of The Logged in User
   * @returns The User From The Database
   */
  public async getCurrentUser(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException("User Not Found")
    return user
  }

  /**
   * Get All Users
   * @returns List of users
   */
  public async getAllUsers(): Promise<User[]> {
    return this.usersRepository.find()
  }

  /**
   * Get User By Id
   * @param id of user
   * @returns user
   */
  public async getUserById(id: number): Promise<User> {
    const user =  await this.usersRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException("User Not Found")
    return user
  }

  /**
   * Update User Role
   * @param id of user
   * @param role (ADMIN, STUDENT, INSTRUCTOR)
   * @returns updated user
   */
  public async updateUserRole(id: number, role: UpdateRoleDto): Promise<User> {
    const user =  await this.usersRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException("User Not Found")
    user.role = role.role
    return this.usersRepository.save(user)
  }

  /**
   * Delete User
   * @param id of user
   */
  public async deleteUser(id: number): Promise<{ message: string }> {
    const user =  await this.usersRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException("User Not Found")
    await this.usersRepository.delete(id);
    return {
      message : 'User deleted successfully'
    }
  }

  /**
     * Generate Web Token
     * @param payload JWT payload
     * @returns token
     */
  private generateJWT(payload: JWTPayloadType): Promise<string> {
    return this.jwtService.signAsync(payload)
  }
}
