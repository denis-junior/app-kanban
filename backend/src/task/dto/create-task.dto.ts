import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task.entity';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
