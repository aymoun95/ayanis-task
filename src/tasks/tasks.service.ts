import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '../guards/auth.guard';
import { User } from '../users/user.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { Task } from './task.entity';

@UseGuards(AuthGuard)
@Injectable()
export class TasksService {
  constructor(@InjectRepository(Task) private repository: Repository<Task>) {}

  create(taskDto: CreateTaskDto, user: User) {
    const task = this.repository.create(taskDto);
    task.user = user;
    return this.repository.save(task);
  }

  findAll() {
    return this.repository.find();
  }

  async update(id: number, attributes: Partial<Task>) {
    const task = await this.repository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    Object.assign(task, attributes);
    return this.repository.save(task);
  }

  async remove(id: number) {
    const task = await this.repository.findOneBy({ id });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.repository.remove(task);
  }
}
