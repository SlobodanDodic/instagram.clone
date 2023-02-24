import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) { }

  async addLike(dto: LikeDto) {
    const { postId, userId } = dto;
    return await this.prisma.like.create({
      data: { userId: userId, postId: postId },
      include: { post: true, user: true },
    });
  }

  async removeLike(id: string) {
    return await this.prisma.like.delete({
      where: { id: id },
    })
  }
}

