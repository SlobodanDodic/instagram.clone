import { User } from '@prisma/client';
import { IsNotEmpty, IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class PostDto {
  // @IsString()
  // @IsNotEmpty()
  // public authorId: User['id'];

  @IsString()
  @IsNotEmpty()
  public author: User['username'];

  @IsString()
  @IsNotEmpty()
  public caption: string;

  @IsString()
  @IsNotEmpty()
  public postImage: string;

  @IsArray()
  @IsOptional()
  public comments: string[];

  @IsNumber()
  @IsOptional()
  public likes: number;
}