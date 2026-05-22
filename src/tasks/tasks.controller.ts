import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  
  import { TasksService } from './tasks.service';
  
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
  import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
  
  @Controller('tasks')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  export class TasksController {
    constructor(private tasksService: TasksService) {}
    @Roles('ADMIN', 'MANAGER')
    @Post()
    createTask(
      @Body() createTaskDto: CreateTaskDto,
    ) {
      return this.tasksService.createTask(
        createTaskDto,
      );
    }
  
    @Get()
    getAllTasks() {
      return this.tasksService.getAllTasks();
    }
    
    @Patch(':id/status')
    updateTaskStatus(
    @Param('id') id: string,
    @Body()
    updateTaskStatusDto: UpdateTaskStatusDto,
    ) {
    return this.tasksService.updateTaskStatus(
        id,
        updateTaskStatusDto.status,
    );
    }
    @Get('my-tasks')
    getMyTasks(@Request() req: any) {
      return this.tasksService.getMyTasks(
        req.user.id,
      );
    }

    @Get('completed')
    getCompletedTasks(
      @Request() req: any,
    ) {
      return this.tasksService.getCompletedTasks(
        req.user.id,
      );
    }

    @Get('pending')
    getPendingTasks(
      @Request() req: any,
    ) {
      return this.tasksService.getPendingTasks(
        req.user.id,
      );
    }

    @Get('high-priority')
    @Roles('ADMIN', 'MANAGER')
    getHighPriorityTasks() {
      return this.tasksService.getHighPriorityTasks();
    }

    @Get('stats')
    getTaskStats(@Request() req: any) {
      return this.tasksService.getTaskStats(
        req.user.id,
      );
    }
  }