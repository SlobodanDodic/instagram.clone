import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) { }

  async createComment(dto: CommentDto) {
    const { post, body, commentAuthor } = dto;
    return await this.prisma.comment.create({
      data: {
        body: body,
        post: { connect: { id: post } },
        commentAuthor: { connect: { id: commentAuthor } },
      },
      include: { post: true, commentAuthor: true },
    });
  }

  async getComments(userId: string) {
    return await this.prisma.comment.findMany({
      where: { post: { id: userId } },
      include: { commentAuthor: true },
    });
  }
}
