import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task-dto';
import { TaskAlreadyExistsException } from './exceptions/task-already-exists.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTasks() {
    return this.prismaService.task.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    const existingTask = await this.prismaService.task.findFirst({
      where: { title: createTaskDto.title },
    });

    if (existingTask) {
      throw new TaskAlreadyExistsException(createTaskDto.title);
    }

    return this.prismaService.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        user: { connect: { id: 1 } }, //temporary hardcoded user connection, replace with actual user id when authentication is implemented
      },
    });
  }

  async deleteTask(id: number) {
    const existingTask = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.prismaService.task.delete({
      where: { id },
    });

    return { message: `Task with id ${id} deleted successfully` };
  }

  async updateTask(id: number, updateTaskDto: CreateTaskDto) {
    const existingTask = await this.prismaService.task.findUnique({
      where: { id },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return this.prismaService.task.update({
      where: { id },
      data: {
        title: updateTaskDto.title,
        description: updateTaskDto.description,
      },
    });
  }
}
