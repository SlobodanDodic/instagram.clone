import { Like, User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  public author: User['username'];

  @IsString()
  @IsNotEmpty()
  public caption: string;

  // @IsString()
  // @IsNotEmpty()
  // public postImage: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public likes: Like['id'];
}