import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Get logged user's profile:
  @UseGuards(JwtAuthGuard)
  @Get('me/:username')
  getMyUser(@Param() params: { username: string }, @Req() req) {
    return this.usersService.getMyUser(params.username, req);
  }

  // Get users by search:
  @Get(':username')
  findUsers(@Param('username') username: string) {
    return this.usersService.findUsers(username);
  }

  // Update logged user's profile:
  @Patch(':username')
  updateProfile(@Param('username') username: string, @Body('profileImage') profileImage: string, @Body('bio') bio: string) {
    return this.usersService.updateProfile(username, profileImage, bio);
  }

  // Get user's profile:
  @Get('profile/:username')
  findUserProfile(@Param('username') username: string) {
    return this.usersService.findUserProfile(username);
  }

  // Follow user:
  @Post('follow/:username')
  follow(@Param('username') username: string, @Body('followerId') followerId: string, @Body('followingId') followingId: string) {
    return this.usersService.follow(username, followingId, followerId);
  }

  // Unfollow user:
  @Delete('follow/:username')
  followRemove(@Param('username') username: string, @Body('followerId') followerId: string, @Body('followingId') followingId: string) {
    return this.usersService.followRemove(username, followingId, followerId);
  }

  // Get all users that logged user follows and who is following him:
  @Get(':username/follows')
  findUserWithFollows(@Param('username') username: string) {
    return this.usersService.findUserWithFollows(username);
  }

  // Get all following users of following users:
  @Get('discover/:id')
  discover(@Param('id') id: string) {
    return this.usersService.discover(id);
  }
}