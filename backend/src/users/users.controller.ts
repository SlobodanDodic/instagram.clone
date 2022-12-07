import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('me/:username')
  getMyUser(@Param() params: { username: string }, @Req() req) {
    return this.usersService.getMyUser(params.username, req);
  }

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }
}