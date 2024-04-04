import { IsArray, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  _id: string;

  @IsString()
  email: string;

  @IsArray()
  lists: string[];
}
