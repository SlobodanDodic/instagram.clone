import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CommentDto, LikeDto, PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async createPost(dto: PostDto) {
    const { author, caption, postImage } = dto;
    return await this.prisma.post.create({
      data: {
        caption,
        postImage,
        author: {
          connect: { username: author },
        },
      },
    });
  }

  async getPost(id: string) {
    return await this.prisma.post.findUnique({
      where: { id: id },
      include: { likes: true, author: true, comments: true },
    })
  }

  async removePost(id: string) {
    return await this.prisma.post.delete({
      where: { id: id },
    })

  }

  async toggleLike(dto: LikeDto) {
    const { postId, userId } = dto;
    return await this.prisma.like.create({
      data: {
        userId: userId,
        postId: postId
      },
      include: {
        post: true,
        user: true
      },
    });
  }

  async removeLike(id: string) {
    return await this.prisma.like.delete({
      where: {
        id: id,
      },
    })
  }

  async createComment(dto: CommentDto) {
    const { post, body, commentAuthor } = dto;
    return await this.prisma.comment.create({
      data: {
        body: body,
        post: {
          connect: { id: post },
        },
        commentAuthor: {
          connect: { id: commentAuthor },
        },
      },
      include: { post: true, commentAuthor: true },
    });
  }

  async getComments(id: string) {
    return await this.prisma.comment.findMany({
      where: {
        post: { id },
      },
      include: { commentAuthor: true },
    });
  }
}