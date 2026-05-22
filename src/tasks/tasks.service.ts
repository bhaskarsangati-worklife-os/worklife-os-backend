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
  async getMyTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
  
  async getCompletedTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
        status: 'DONE',
      },
    });
  }
  
  async getPendingTasks(userId: string) {
    return this.prisma.task.findMany({
      where: {
        assignedToId: userId,
        status: {
          not: 'DONE',
        },
      },
    });
  }
  
  async getHighPriorityTasks() {
    return this.prisma.task.findMany({
      where: {
        priority: 'HIGH',
      },
    });
  }
  
  async getTaskStats(userId: string) {
    const totalTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: userId,
        },
      });
  
    const completedTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: userId,
          status: 'DONE',
        },
      });
  
    const pendingTasks =
      await this.prisma.task.count({
        where: {
          assignedToId: userId,
          status: {
            not: 'DONE',
          },
        },
      });
  
    return {
      totalTasks,
      completedTasks,
      pendingTasks,
    };
  }
}