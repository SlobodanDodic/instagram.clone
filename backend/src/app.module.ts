import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostModule } from './post/post.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AssignedTokenGuard } from './common/guards/assigned_token.guard';
import { FollowModule } from './follow/follow.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    PostModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.TRANSPORT_AUTH,
        defaults: {
          from: `"nest-modules" <${process.env.MAIL_FROM}>`,
        },
      }),
    }),
    MulterModule.register({ dest: './uploads' }),
    FollowModule,
    LikeModule,
    CommentModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AssignedTokenGuard,
    },
  ],
})
export class AppModule { }
