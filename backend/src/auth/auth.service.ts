import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(){
    return {message: "Sign-up was succesfull!"}
  }
  async signin(){
    return {message: "Sign-in was succesfull!"}
  }
  async signout(){
    return {message: "Sign-out was succesfull!"}
  }

}
