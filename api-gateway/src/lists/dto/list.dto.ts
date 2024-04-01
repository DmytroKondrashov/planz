import { IsArray, IsString } from 'class-validator';

export class ListDto {
  @IsString()
  name: string;

  @IsString()
  userId: string;

  @IsArray()
  plans: [];

  @IsString()
  __v: string;

  @IsString()
  _id: string;
}
