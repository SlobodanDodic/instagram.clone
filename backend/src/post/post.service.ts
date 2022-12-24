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
        author: { connect: { username: author } },
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

  async getComments(id: string) {
    return await this.prisma.comment.findMany({
      where: { post: { id } },
      include: { commentAuthor: true },
    });
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
      include: { likes: true, author: true, comments: true },
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
