import {
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { TaskService } from './task.service';
import type { Task } from 'generated/prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTasks() {
    return await this.taskService.getAllTasks();
  }
  @Get(':id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskService.getTaskById(Number(id));

    if (!task) throw new NotFoundException('Task not found');
    return task;
  }
  @Post()
  async createTask(@Body() data: Task) {
    return await this.taskService.createTask(data);
  }
  @Put(':id')
  async updateTask(@Param('id') id: string, @Body() data: Task) {
    return await this.taskService.updateTask(Number(id), data);
  }
  @Delete(':id')
  async deleteTask(@Param('id') id: string) {
    try {
      return await this.taskService.deleteTask(Number(id));
    } catch {
      throw new NotFoundException('Task not found');
    }
  }
}
