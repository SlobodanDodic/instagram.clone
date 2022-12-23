import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  // Gey logged user's profile:
  async getMyUser(username: string, req: Request) {
    const decodedUserInfo = req.user as { username: string; email: string };

    const foundUser = await this.prisma.user.findUnique({ where: { username } });

    if (!foundUser) {
      throw new NotFoundException();
    }
    if (foundUser.username !== decodedUserInfo.username) {
      throw new ForbiddenException();
    }
    delete foundUser.hashedPassword;

    return { user: foundUser };
  }

  // Get users by search:
  async findUsers(username: string) {
    return await this.prisma.user.findMany({
      where: {
        username: { contains: username }
      }
    });
  }

  // Update logged user's profile:
  async updateProfile(username: string, profileImage: string, bio: string) {
    return this.prisma.user.update({
      where: { username },
      data: { profileImage: profileImage, bio: bio },
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
        posts: {
          include: { likes: true, comments: true }
        },
        followers: {
          include: { follower: true, following: true }
        },
        following: {
          include: { follower: true, following: true }
        }
      }
    })
  }

  // Follow user:
  async follow(username: string, followerId: string, followingId: string) {
    return await this.prisma.follows.createMany({
      data: [
        {
          followerId: followerId,
          followingId: followingId,
        }
      ],
    });
  }

  // Unfollow user:
  async followRemove(username: string, followerId: string, followingId: string) {
    return await this.prisma.follows.delete({
      where: {
        followerId_followingId: {
          followerId: followerId,
          followingId: followingId,
        }
      },
    });
  }

  // Get all users that logged user follows and who is following him:
  async findUserWithFollows(username: string) {
    return await this.prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        username: true,
        followers: {
          include: { follower: true, following: true }
        },
        following: {
          include: { follower: true, following: true }
        }
      }
    })
  }

  // Get all user's posts with likes and comments:
  async userPosts(username: string) {
    return await this.prisma.user.findUnique({
      where: { username: username },
      include: { posts: { include: { likes: true, comments: true } } }
    })
  }

  // Get all following users of following users:
  async discovery(id: string) {
    const usersArray = await this.usersArray(id);
    const ids = usersArray?.following.map((id) => id.followingId);

    return await this.prisma.user.findMany({
      where: { id: { in: ids } },
      select: { following: { select: { followingId: true } } },
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