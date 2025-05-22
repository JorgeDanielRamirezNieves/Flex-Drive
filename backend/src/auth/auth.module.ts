import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Login } from './models/login';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/models/user';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Login, User])],
  exports: [TypeOrmModule],
})
export class AuthModule {}
