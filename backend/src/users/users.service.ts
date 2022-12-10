import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const users = await this.prisma.user.findMany({ select: { username: true, email: true } });
    return { users };
  }

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

  async findUsers(username: string) {
    return await this.prisma.user.findMany({ where: { username: { contains: username } } });
  }

  async updateProfile(username: string, profileImage: string, bio: string) {
    return this.prisma.user.update({
      where: { username },
      data: { profileImage: profileImage, bio: bio },
    });
  }
}