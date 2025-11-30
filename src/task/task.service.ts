import { Injectable } from '@nestjs/common';
import { Task } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAllTasks(): Promise<Task[]> {
    return await this.prisma.task.findMany();
  }

  async getTaskById(id: number): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async createTask(data: Task): Promise<Task> {
    return await this.prisma.task.create({
      data,
    });
  }

  async updateTask(id: number, data: Task): Promise<Task> {
    return await this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return await this.prisma.task.delete({ where: { id } });
  }
}
