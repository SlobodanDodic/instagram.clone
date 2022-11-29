import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: process.env.TRANSPORT_AUTH,
        defaults: {
          from: `"nest-modules" <${process.env.MAIL_FROM}>`,
        },
      }),
    }),
    // MailerModule.forRoot({
    //   transport: process.env.TRANSPORT_AUTH,
    // }),
  ],
})
export class AppModule { }
