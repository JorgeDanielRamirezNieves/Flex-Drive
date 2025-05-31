import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Login } from './models/login';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  lodinUser(@Body() login: Login) {
    return this.authService.login(login);
  }

  @Patch('changeEmail')
  changeEmail(@Body() userdata: any) {
    return this.authService.changeEmail(userdata.uuid, userdata.email);
  }
}
