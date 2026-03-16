import {
  type ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import { TaskAlreadyExistsException } from '../exceptions/task-already-exists.exception';

@Catch(TaskAlreadyExistsException)
export class TaskAlreadyExistsFilter implements ExceptionFilter {
  catch(exception: TaskAlreadyExistsException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(HttpStatus.CONFLICT).json({
      statusCode: HttpStatus.CONFLICT,
      message: exception.message,
      error: 'Conflict',
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
