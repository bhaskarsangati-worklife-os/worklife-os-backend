import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  
  import { AuthGuard } from '@nestjs/passport';
  
  import { TasksService } from './tasks.service';
  
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
  
  @Controller('tasks')
  @UseGuards(AuthGuard('jwt'))
  export class TasksController {
    constructor(private tasksService: TasksService) {}
  
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
  }