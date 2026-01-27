import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import * as studentProfileEntity from './entities/studentPofile.entity';
import { StudentProfileService } from './studentProfile.service';
import { StudentProfileController } from './studentProfile.controller';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthGuard } from 'src/modules/users/guards/auth.guard';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      studentProfileEntity.StudentProfile
    ]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.getOrThrow<string>('JWT_SECRET'),
          signOptions: { expiresIn: config.getOrThrow<string>('JWT_EXPIRES_IN') as any }
        }
      }
    }),
  ],
  providers: [AuthGuard, StudentProfileService],
  controllers: [StudentProfileController],
  exports: [TypeOrmModule, JwtModule],
})
export class StudentProfileModule {}