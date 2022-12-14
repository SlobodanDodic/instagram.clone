import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PostDto } from '../post/dto/post.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:username')
  getMyUser(@Param() params: { username: string }, @Req() req) {
    return this.usersService.getMyUser(params.username, req);
  }

  @Get(':username')
  findUsers(@Param('username') username: string) {
    return this.usersService.findUsers(username);
  }

  @Patch(':username')
  updateProfile(@Param('username') username: string, @Body('profileImage') profileImage: string, @Body('bio') bio: string) {
    return this.usersService.updateProfile(username, profileImage, bio);
  }

}