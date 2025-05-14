import { IsIn } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsIn(['pending', 'in_progress', 'testing', 'done'])
  status: string;
}
