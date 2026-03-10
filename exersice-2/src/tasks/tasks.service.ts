import { Injectable } from '@nestjs/common';
import type { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TasksService {
  private readonly tasks = [
    { id: 1, title: 'Task 1', description: 'This is task 1' },
    { id: 2, title: 'Task 2', description: 'This is task 2' },
    { id: 3, title: 'Task 3', description: 'This is task 3' },
  ];

  getTasks() {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto) {
    const newtask = {
      id: this.tasks.length + 1,
      ...createTaskDto,
    };

    this.tasks.push(newtask);

    return newtask;
  }

  deleteTask(id: string) {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);

    if (taskIndex === -1) {
      return { message: `Task with id ${id} not found` };
    }

    this.tasks.splice(taskIndex, 1);

    return this.tasks;
  }

  updateTask(id: string, updateTaskDto: CreateTaskDto) {
    const taskIndex = this.tasks.findIndex((task) => task.id === +id);

    if (taskIndex === -1) {
      return { message: `Task with id ${id} not found` };
    }

    this.tasks[taskIndex] = { id: +id, ...updateTaskDto };

    return this.tasks[taskIndex];
  }
}
