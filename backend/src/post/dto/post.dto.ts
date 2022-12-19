import { Like, Post, User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PostDto {
  @IsString()
  @IsNotEmpty()
  public author: User['username'];

  @IsString()
  @IsNotEmpty()
  public caption: string;

  @IsString()
  @IsNotEmpty()
  public postImage: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  public likes: Like['id'];
}

export class CommentDto {
  @IsString()
  @IsNotEmpty()
  public post: Post['id'];

  @IsString()
  @IsNotEmpty()
  public commentAuthor: User['id'];

  @IsString()
  @IsNotEmpty()
  public body: string;
}

export class LikeDto {
  @IsString()
  @IsNotEmpty()
  public postId: Post['id'];

  @IsString()
  @IsNotEmpty()
  public userId: User['id'];
}