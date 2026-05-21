
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
    // register code
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      message: 'Login successful',
      token,
      user,
    };
  }
}