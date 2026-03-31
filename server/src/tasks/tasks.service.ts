import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task-dto';
import { TaskAlreadyExistsException } from './exceptions/task-already-exists.exception';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTaskById(userId: number, id: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return task;
  }

  async getTasks(userId: number, page: number, limit: number) {
    if (page < 1) {
      throw new BadRequestException('Page must be greater than 0');
    }

    if (limit < 1) {
      throw new BadRequestException('Limit must be greater than 0');
    }

    const maxLimit = 100;
    const normalizedLimit = Math.min(limit, maxLimit);
    const skip = (page - 1) * normalizedLimit;

    const [tasks, total] = await this.prismaService.$transaction([
      this.prismaService.task.findMany({
        where: { userId },
        orderBy: { id: 'asc' },
        skip,
        take: normalizedLimit,
      }),
      this.prismaService.task.count({ where: { userId } }),
    ]);

    const totalPages = Math.ceil(total / normalizedLimit);

    return {
      data: tasks,
      meta: {
        page,
        limit: normalizedLimit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    };
  }

  async createTask(userId: number, createTaskDto: CreateTaskDto) {
    const existingTask = await this.prismaService.task.findFirst({
      where: { title: createTaskDto.title, userId },
    });

    if (existingTask) {
      throw new TaskAlreadyExistsException(createTaskDto.title);
    }

    return this.prismaService.task.create({
      data: {
        title: createTaskDto.title,
        description: createTaskDto.description,
        user: { connect: { id: userId } },
      },
    });
  }

  async deleteTask(userId: number, id: number) {
    const existingTask = await this.prismaService.task.findFirst({
      where: { id, userId },
    });

    if (!existingTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    await this.prismaService.task.delete({
      where: { id },
    });

    return { message: `Task with id ${id} deleted successfully` };
  }

  async updateTask(userId: number, id: number, updateTaskDto: CreateTaskDto) {
    const existingTask = await this.prismaService.task.findFirst({
      where: { id, userId },
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
