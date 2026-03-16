import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Param,
  Post,
  Put,
  UseFilters,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { CreateTaskDto } from './dto/create-task-dto';
import { TaskAlreadyExistsFilter } from './filters/task-already-exists.filter';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks() {
    return this.tasksService.getTasks();
  }

  @Post()
  @UseFilters(TaskAlreadyExistsFilter)
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.tasksService.deleteTask(id);
  }

  @Put(':id')
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.updateTask(id, updateTaskDto);
  }
}
