import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // Get logged user's profile:
  async getMyProfile(refreshToken: string) {
    const foundUser = await this.prisma.user.findUnique({
      where: { token: refreshToken },
      select: {
        id: true,
        bio: true,
        email: true,
        username: true,
        profileImage: true,
        // posts: { include: { author: true, likes: true, comments: { include: { commentAuthor: true } } } },
        // followers: { include: { follower: true, following: true } },
        following: { include: { follower: true, following: true } }
      }
    });

    if (!foundUser) {
      throw new NotFoundException();
    }

    return foundUser;
  }

  // Get users by search:
  async findUsers(username: string) {
    return await this.prisma.user.findMany({
      where: { username: { contains: username } }
    });
  }

  // Update logged user's profile:
  async updateProfile(refreshToken: string, bio: string, file: any) {
    console.log(file);
    return this.prisma.user.update({
      where: { token: refreshToken },
      data: { profileImage: file.path, bio: bio },
    });
  }

  // Get user's profile:
  async findUserProfile(username: string) {
    return await this.prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        bio: true,
        email: true,
        username: true,
        profileImage: true,
        posts: { include: { author: true, likes: true, comments: { include: { commentAuthor: true } } } },
        followers: { include: { follower: true, following: true } },
        following: { include: { follower: true, following: true } }
      }
    })
  }

  // async setAvatar(username: string, avatarUrl: string) {
  //   this.prisma.user.update({
  //     where: { username: username },
  //     data: { profileImage: avatarUrl }
  //   });
  // }

}