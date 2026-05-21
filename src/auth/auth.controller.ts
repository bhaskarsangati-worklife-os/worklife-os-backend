import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }
  
  @Post('login')
    async login(
    @Body() loginDto: LoginDto,
    ) {
    return this.authService.login(
        loginDto.email,
        loginDto.password,
    );
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getProfile(@Request() req: any) {
    return req.user;
    }
}