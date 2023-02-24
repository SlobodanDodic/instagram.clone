import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { FollowService } from './follow.service';

@Public()
@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) { }

  // Follow user:
  @Post(':username')
  follow(@Param('username') username: string, @Body('followerId') followerId: string, @Body('followingId') followingId: string) {
    return this.followService.follow(username, followingId, followerId);
  }

  // Unfollow user:
  @Delete(':username')
  followRemove(@Param('username') username: string, @Body('followerId') followerId: string, @Body('followingId') followingId: string) {
    return this.followService.followRemove(username, followingId, followerId);
  }

  // Get all users that logged user follows and who is following him:
  @Get(':username/follows')
  findUserWithFollows(@Param('username') username: string) {
    return this.followService.findUserWithFollows(username);
  }

  // Get all following users of following users:
  @Get('discover/:id')
  discover(@Param('id') id: string) {
    return this.followService.discover(id);
  }
}
