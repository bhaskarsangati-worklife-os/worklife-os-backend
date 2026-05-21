import {
    Controller,
    Get,
    Request,
    UseGuards,
  } from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('users')
  export class UsersController {
    @UseGuards(AuthGuard('jwt'))
    @Get('profile')
    getProfile(@Request() req: any) {
      return {
        message: 'Protected profile route',
        user: req.user,
      };
    }
  }