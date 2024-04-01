import { IsArray, IsOptional, IsString } from 'class-validator';

export class EditListDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsArray()
  @IsOptional()
  plans?: [];
}
