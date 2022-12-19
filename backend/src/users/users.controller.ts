import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
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

  @Get('postsBy/:username')
  findUserPosts(@Param('username') username: string) {
    return this.usersService.findUserPosts(username);
  }

  @Get(':username/posts')
  findUserWithPosts(@Param('username') username: string) {
    return this.usersService.findUserWithPosts(username);
  }

}