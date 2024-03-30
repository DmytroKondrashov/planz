import { IsOptional, IsString } from 'class-validator';

export class SearchUserDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
