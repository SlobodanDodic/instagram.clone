import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto, AuthDtoForgot, AuthDtoSignIn } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import { Tokens } from './types/tokens.types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtPayload } from './types/jwtPayload.type';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailService: MailerService,
    private config: ConfigService,
  ) { }

  async signup(dto: AuthDto): Promise<Tokens> {
    const hashedPassword = await argon2.hash(dto.password);
    console.log("auth/signup:" + hashedPassword);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hashedPassword,
        username: dto.username,
      },
    })
      .catch((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            throw new ForbiddenException('Credentials incorrect');
          }
        }
        throw error;
      });

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    await this.mailService.sendMail({
      to: dto.email,
      from: process.env.MAIL_FROM,
      subject: 'Confirmation email',
      template: '/email',
      html: `<a href='http://localhost:3000/activate/${tokens.refresh_token}'>Click here to confirm your email</a>`,
    }).then((res) => {
      console.log(res, 'Email is sent');
    })
      .catch((err) => {
        console.log(err, 'Error sending email');
      });

    return tokens;
  }

  async signin(dto: AuthDtoSignIn) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    if (!user.isActivated) throw new BadRequestException('Email not confirmed');

    const passwordMatches = await argon2.verify(user.hashedPassword, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    const userInfo = { refreshToken: tokens.refresh_token, loggedUser: user.username };

    return userInfo;
  }

  async signout(userId: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        id: userId,
        token: { not: null },
      },
      data: { token: null },
    });
    return true;
  }

  async activate(token: string) {
    return await this.prisma.user.update({
      where: { token: token },
      data: { isActivated: true },
    });
  }

  async updateAccount(token: string, dto: AuthDto) {
    const hashedPassword = await argon2.hash(dto.password);

    await this.prisma.user.update({
      where: { token },
      data: {
        username: dto.username,
        email: dto.email,
        hashedPassword,
        isActivated: dto.isActivated,
      },
    });

    await this.mailService.sendMail({
      to: dto.email,
      from: process.env.MAIL_FROM,
      subject: 'Confirmation email',
      template: '/email',
      html: `<a href='http://localhost:3000/activate/${token}'>Click here to confirm your email</a>`,
    }).then((res) => {
      console.log(token);
      console.log(res, 'Email is sent');
    })
      .catch((err) => {
        console.log(err, 'Error sending email');
      });

    return { message: "Link for profile update was successfully sent! Please check your email box..." };
  }

  async delete(token: string) {
    return this.prisma.user.delete({
      where: { token },
    });
  }

  // helper functions

  async refreshTokens(userId: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user || !user.token) throw new ForbiddenException('Access Denied');

    // const rtMatches = await argon2.verify(user.token, rt);
    // if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: string, rt: string): Promise<void> {
    // const hash = await argon2.hash(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        token: rt,
      },
    });
  }

  async getTokens(userId: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      sub: userId,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('AT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('RT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  // old way

  async forgot(dto: AuthDtoForgot) {
    const { email } = dto;
    const foundUser = await this.prisma.user.findUnique({ where: { email } });

    await this.mailService.sendMail({
      to: foundUser.email,
      from: process.env.MAIL_FROM,
      subject: 'Reset your password',
      template: '/email',
      html: `<a href='http://localhost:3000/reset-password/${foundUser.token}'>Click here to change your password</a>`,
    }).then((res) => {
      console.log(res, 'Email is sent');
    })
      .catch((err) => {
        console.log(err, 'Error sending email');
      });

    return { message: "Link for password change was successfully sent! Please check your email box..." };
  }

  async reset(token: string, password: string) {
    const hashedPassword = await argon2.hash(password);


    return this.prisma.user.update({
      where: { token },
      data: { hashedPassword: hashedPassword },
    });
  }


}
