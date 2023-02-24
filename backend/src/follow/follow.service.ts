import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prisma: PrismaService) { }

  // Follow user:
  async follow(username: string, followerId: string, followingId: string) {
    return await this.prisma.follows.createMany({
      data: [{ followerId: followerId, followingId: followingId }],
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
        followers: { include: { follower: true, following: true } },
        following: { include: { follower: true, following: true } }
      }
    })
  }

  // Get all following users of following users:
  async discover(id: string) {
    const usersArray = await this.usersArray(id);
    const ids = usersArray?.following.map((id) => id.followingId);

    return await this.prisma.user.findMany({
      where: { id: { in: ids } },
      select: { following: { select: { following: true } } },
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


