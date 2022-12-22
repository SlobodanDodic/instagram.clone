import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CommentDto, LikeDto, PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post('create')
  createPost(@Body() dto: PostDto) {
    return this.postService.createPost(dto);
  }

  @Get(':id')
  getPost(@Param('id') id: string) {
    return this.postService.getPost(id);
  }

  @Delete(':id')
  removePost(@Param('id') id: string) {
    return this.postService.removePost(id);
  }

  @Post('like')
  toggleLike(@Body() dto: LikeDto) {
    return this.postService.toggleLike(dto);
  }

  @Delete('like/:id')
  removeLike(@Param('id') id: string) {
    return this.postService.removeLike(id);
  }

  @Post('comment')
  createComment(@Body() dto: CommentDto) {
    return this.postService.createComment(dto);
  }

  @Get('comments/:id')
  getComments(@Param('id') id: string) {
    return this.postService.getComments(id);
  }
}
