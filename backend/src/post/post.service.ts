import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    return await this.prisma.post.findMany({});
  }

  async createPost(dto: PostDto) {
    const { author, caption, postImage, comments } = dto;

    return await this.prisma.post.create({
      data: {
        caption,
        postImage,
        comments: {
          create: []
        },
        author: {
          connect: { username: author },
        },
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.post.findUnique({ where: { id: id } });
  }
}
