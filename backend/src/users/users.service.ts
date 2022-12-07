import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

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

  async getUsers() {
    const users = await this.prisma.user.findMany({
      select: { id: true, username: true, email: true, isActivated: true },
    });

    return { users };
  }
}