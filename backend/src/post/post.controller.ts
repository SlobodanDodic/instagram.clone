import { Body, Controller, Delete, Get, Param, Post, Res, StreamableFile, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Public } from 'src/common/decorators/public.decorator';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';
@Public()
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const filename = `${uniqueSuffix}${extname(file.originalname)}`;
        cb(null, filename);
      },
    }),
  }),
  )
  createPost(@Body() dto: PostDto, @UploadedFile() file: Express.Multer.File) {
    return this.postService.createPost(dto, file);
  }

  @Get('uploads/:id')
  getFile(@Param('id') id: string): StreamableFile {
    const image = createReadStream(join(process.cwd(), `uploads/${id}`));
    console.log(image);
    return new StreamableFile(image);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(id);
  }

  // Get all user's posts with likes and comments:
  @Get("userPosts/:username")
  userPosts(@Param('username') username: string) {
    return this.postService.userPosts(username);
  }

  // Get all posts of following users:
  @Get('getPostsOfFollowing/:id')
  getPostsOfFollowing(@Param('id') id: string) {
    return this.postService.getPostsOfFollowing(id);
  }

  @Get('uploads/:fileId')
  async serveAvatar(@Param('fileId') fileId: string, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }

}
