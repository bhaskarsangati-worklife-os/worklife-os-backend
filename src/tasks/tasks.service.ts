import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async createTask(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        priority: createTaskDto.priority,
        dueDate: createTaskDto.dueDate,
        assignedToId: createTaskDto.assignedToId,
      },
    });
  }

  async getAllTasks() {
    return this.prisma.task.findMany({
      include: {
        assignedTo: true,
      },
    });
  }
  async updateTaskStatus(
    taskId: string,
    status: any,
  ) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        status,
      },
    });
  }
}