import {
  Body,
  Controller,
  Delete,
  Get,
  Req,
  ParseIntPipe,
  Param,
  Post,
  Put,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { TasksService } from './tasks.service';
import type { CreateTaskDto } from './dto/create-task-dto';
import { TaskAlreadyExistsFilter } from './filters/task-already-exists.filter';
import { AuthGuard } from '../auth/auth.guard';
import { PayLoadType } from '../auth/type/payLoadType';

interface AuthenticatedRequest extends Request {
  user: PayLoadType;
}

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getTasks(@Req() request: AuthenticatedRequest) {
    return this.tasksService.getTasks(request.user.sub);
  }

  @Post()
  @UseFilters(TaskAlreadyExistsFilter)
  createTask(
    @Req() request: AuthenticatedRequest,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.createTask(request.user.sub, createTaskDto);
  }

  @Delete(':id')
  deleteTask(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.tasksService.deleteTask(request.user.sub, id);
  }

  @Put(':id')
  updateTask(
    @Req() request: AuthenticatedRequest,
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ) {
    return this.tasksService.updateTask(request.user.sub, id, updateTaskDto);
  }
}
