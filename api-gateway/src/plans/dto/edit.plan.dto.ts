import { IsDate, IsOptional, IsString } from 'class-validator';

export class EditPlanDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  text?: string;

  @IsDate()
  @IsOptional()
  due?: Date;

  @IsString()
  @IsOptional()
  listId?: string;
}
