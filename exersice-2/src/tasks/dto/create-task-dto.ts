import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @MaxLength(500)
  description: string;
}
