import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  
  import { JwtService } from '@nestjs/jwt';
  import * as bcrypt from 'bcrypt';
  
  import { UsersService } from '../users/users.service';
  import { RegisterDto } from './dto/register.dto';
  
  @Injectable()
  export class AuthService {
    constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
    ) {}
  
    async register(registerDto: RegisterDto) {
      const existingUser = await this.usersService.findByEmail(
        registerDto.email,
      );
  
      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
  
      const hashedPassword = await bcrypt.hash(
        registerDto.password,
        10,
      );
  
      const user = await this.usersService.createUser({
        name: registerDto.name,
        email: registerDto.email,
        password: hashedPassword,
      });
  
      const token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
  
      return {
        message: 'User registered successfully',
        token,
        user,
      };
    }
  }