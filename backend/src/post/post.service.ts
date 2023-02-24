import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) { }

  async createPost(dto: PostDto, file: any) {
    return await this.prisma.post.create({
      data: {
        caption: dto.caption,
        postImage: file.path,
        author: { connect: { username: dto.author } },
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

  // Get all posts of following users:
  async userPosts(username: string) {
    return await this.prisma.post.findMany({
      where: { author: { username: username } },
      include: { likes: true, author: true, comments: true },
      orderBy: { published: "desc" }
    });
  }

  // Get all posts of following users:
  async getPostsOfFollowing(id: string) {
    const usersArray = await this.usersArray(id);
    const ids = usersArray?.following.map((id) => id.followingId);

    return await this.prisma.post.findMany({
      where: { authorId: { in: ids } },
      include: { likes: true, author: true, comments: { include: { commentAuthor: true } } },
      orderBy: { published: "desc" }
    });
  }

  // helper functions:
  async usersArray(id: string) {
    return await this.prisma.user.findUnique({
      where: { id: id },
      select: { following: { select: { followingId: true } } },
    })
  }
}
