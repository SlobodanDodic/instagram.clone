import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto){
    return {message: "Sign-up was succesfull!"}
  }
  async signin(dto: AuthDto){
    return {message: "Sign-in was succesfull!"}
  }
  async signout(dto: AuthDto){
    return {message: "Sign-out was succesfull!"}
  }

}
