import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dtos/register.dto";
import { LoginDto } from "./dtos/login.dto";
import { AuthGuard } from "./guards/auth.guard";
import { AuthRolesGuard } from "./guards/auth-role.guard";
import { Role } from "utils/enum";
import { Roles } from "./decorators/user-role.decorator";
import { request } from "https";
import { UpdateRoleDto } from "./dtos/update-role.dto";


@Controller('api/users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ) { }

  // POST ~/api/users/auth/register
  @Post('auth/register')
  public async register(@Body(new ValidationPipe()) body: RegisterDto) {
    return this.usersService.register(body);
  }

  // POST ~/api/users/auth/login
  @Post('auth/login')
  public async login(@Body() body: LoginDto) {
    return this.usersService.login(body);
  }

  // GET ~/api/users/current-user
  @Get('current-user')
  @UseGuards(AuthGuard)
  public getCurrentUser(@Req() request: any) {
    const payload = request.user;
    return this.usersService.getCurrentUser(payload.id)
  }

  // GET ~/api/users/
  @Get()
  @Roles(Role.ADMIN)
  @UseGuards(AuthRolesGuard)
  public async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  // GET ~/api/users/:id
  @Get(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthRolesGuard)
  public async getUserById(@Req() request: any) {
    const userId = request.params.id;
    return this.usersService.getUserById(userId);
  }

  // PUT ~/api/users/:id
  @Put('update-role/:id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthRolesGuard)
  public async updateUserRole(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateRoleDto) {
    return this.usersService.updateUserRole(id, body);
  }

  // DELETE ~/api/users/:id
  @Delete(':id')
  @Roles(Role.ADMIN)
  @UseGuards(AuthRolesGuard)
  public async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}