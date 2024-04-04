import { IsArray, IsString } from 'class-validator';
import { List } from 'src/lists/schemas/plan.schema';

export class UserDto {
  @IsString()
  _id: string;

  @IsString()
  email: string;

  @IsArray()
  lists: List[];
}
