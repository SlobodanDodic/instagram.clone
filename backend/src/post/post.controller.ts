import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentDto, LikeDto, PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post('create')
  createPost(@Body() dto: PostDto) {
    return this.postService.createPost(dto);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Post('toggleLike')
  toggleLike(@Body() dto: LikeDto) {
    return this.postService.toggleLike(dto);
  }

  @Delete('like/:id')
  removeLike(@Param('id') id: string) {
    return this.postService.removeLike(id);
  }

  @Get("likes/:id")
  likes(@Param('id') id: string) {
    return this.postService.likes(id);
  }

  @Post('createComment')
  createComment(@Body() dto: CommentDto) {
    return this.postService.createComment(dto);
  }

  @Get('getComments/:id')
  getComments(@Param('id') id: string) {
    return this.postService.getComments(id);
  }
}
