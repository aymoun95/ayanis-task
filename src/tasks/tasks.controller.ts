import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { TasksService } from './tasks.service';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post('')
  async createTask(@Body() body: CreateTaskDto, @CurrentUser() user: User) {
    const task = await this.tasksService.create(body, user);
    return task;
  }

  @Get('')
  async getTasks() {
    const tasks = await this.tasksService.findAll();
    return tasks;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.tasksService.remove(parseInt(id));
  }

  @Patch('/:id')
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.tasksService.update(parseInt(id), body);
  }
}
