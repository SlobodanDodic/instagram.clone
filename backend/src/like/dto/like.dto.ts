import { Post, User } from '@prisma/client';
import { IsNotEmpty, IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  @IsNotEmpty()
  public postId: Post['id'];

  @IsString()
  @IsNotEmpty()
  public userId: User['id'];
}