import {
    Controller,
    Get,
    Request,
    UseGuards,
  } from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  import { Body, Patch, Param } from '@nestjs/common';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UsersService } from './users.service';
  
  @Controller('users')
  export class UsersController {
    constructor(
      private usersService: UsersService,
    ) {}
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Get('profile')
    getProfile(@Request() req: any) {
      return {
        message: 'Protected profile route',
        user: req.user,
      };
    }
    @Roles('ADMIN')
    @Patch(':id/role')
    updateRole(
      @Param('id') id: string,
      @Body() dto: UpdateUserRoleDto,
    ) {
      return this.usersService.updateUserRole(id, dto.role);
    }
  }