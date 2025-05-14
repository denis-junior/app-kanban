import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  findAll() {
    return this.taskRepo.find();
  }

  create(dto: CreateTaskDto) {
    const task = this.taskRepo.create(dto);
    return this.taskRepo.save(task);
  }

  update(id: number, dto: UpdateTaskDto) {
    return this.taskRepo.update(id, dto);
  }

  remove(id: number) {
    return this.taskRepo.delete(id);
  }

  async updateStatus(id: number, status: string): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    // Validar se o status fornecido é um valor válido do enum TaskStatus
    if (!Object.values(TaskStatus).includes(status as TaskStatus)) {
      throw new Error(`Invalid status value: ${status}`);
    }

    task.status = status as TaskStatus; // Converter a string para TaskStatus
    return this.taskRepo.save(task);
  }
}
