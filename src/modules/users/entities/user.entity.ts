import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Role } from '../../../../utils/enum';
import { Enrollment } from '../../enrollments/entities/enrollment.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: '150', nullable: false})
  username: string;

  @Column({type: 'varchar', length: '150', unique: true})
  email: string;

  @Column()
  password: string;

  @Column({type: 'enum', enum: Role, default: Role.STUDENT})
  role: Role;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
  createdAt: Date;

  @Column({type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
  updatedAt: Date;
  // @OneToMany(() => Enrollment, enrollment => enrollment.user)
  // enrollments: Enrollment[];
}
