import { Body, Controller, Get, Param, Patch, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { GetCurrentUser } from 'src/common/decorators/get-current-user.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { RefreshedTokenGuard } from 'src/common/guards/refreshed_token.guard';
import { UsersService } from './users.service';

@Public()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  // Get logged user's profile:
  @UseGuards(RefreshedTokenGuard)
  @Get('me')
  getMyProfile(@GetCurrentUser('refreshToken') refreshToken: string) {
    return this.usersService.getMyProfile(refreshToken);
  }

  // Get users by search:
  @Get(':username')
  findUsers(@Param('username') username: string) {
    return this.usersService.findUsers(username);
  }

  // Update logged user's profile:
  @UseGuards(RefreshedTokenGuard)
  @Patch('me')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './avatars',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}${extname(file.originalname)}`;
        cb(null, filename);
      }
    })
  }))
  updateProfile(@GetCurrentUser('refreshToken') refreshToken: string, @Body('bio') bio: string, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.updateProfile(refreshToken, bio, file);
  }

  // Get user's profile:
  @Get('profile/:username')
  findUserProfile(@Param('username') username: string) {
    return this.usersService.findUserProfile(username);
  }

  // Get user's avatars:
  @Get('avatars/:fileId')
  async serveAvatar(@Param('fileId') fileId: string, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'avatars' });
  }

}