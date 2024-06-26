import { IsDate, IsString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  name: string;

  @IsString()
  text: string;

  @IsDate()
  due: Date;

  @IsString()
  listId: string;
}
