import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto, AuthDtoSignIn } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mailService: MailerService
  ) { }

  async signup(dto: AuthDto) {
    const { username, email, password, isActivated } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    if (foundUser) {
      throw new BadRequestException("Email already exists");
    }

    const hashedPassword = await this.hashPassword(password);

    await this.prisma.user.create({
      data: {
        username,
        email,
        hashedPassword,
        isActivated
      },
    });

    await this.mailService.sendMail({
      to: email,
      from: process.env.MAIL_FROM,
      subject: 'Confirmation email',
      template: '/email',
      html: `<a href='http://localhost:3000/active/${username}'>Click here to confirm your email</a>`,
    }).then((res) => {
      console.log(res, 'Email is sent');
    })
      .catch((err) => {
        console.log(err, 'Error sending email');
      });

    return { message: "Sign-up was succesfull! Please check your email box..." }
  }

  async signin(dto: AuthDtoSignIn, req: Request, res: Response) {
    const { username, password } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { username } });

    if (!foundUser.isActivated) {
      throw new BadRequestException('Email not confirmed');
    } else {
      if (!foundUser) {
        throw new BadRequestException("Wrong credentials");
      }
      const compareSuccess = await this.comparePasswords({
        password,
        hash: foundUser.hashedPassword,
      });
      if (!compareSuccess) {
        throw new BadRequestException('Wrong credentials');
      }
      const token = await this.signToken({
        userId: foundUser.id,
        username: foundUser.username,
      });
      if (!token) {
        throw new ForbiddenException('Could not signin');
      }
      res.cookie('token', token, {});

      return res.send({ message: 'Logged in succefully' });
    }

  }

  async signout(req: Request, res: Response) {
    res.clearCookie('token');
    return res.send({ message: 'Logged out succefully' });
  }

  async update(username: string, isActivated: boolean) {
    return this.prisma.user.update({
      where: { username },
      data: isActivated,
    });
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
  }

  async comparePasswords(args: { hash: string; password: string }) {
    return await bcrypt.compare(args.password, args.hash);
  }

  async signToken(args: { userId: string; username: string }) {
    const payload = {
      id: args.userId,
      username: args.username,
    };

    const token = await this.jwt.signAsync(payload, {
      secret: process.env.JWT_SECRET,
    });

    return token;
  }

}
