import { Comment, Post, User } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  public reply: Comment['id'];
}
