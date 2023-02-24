import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorators/get-current-user-id.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Public()
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @Post()
  createComment(@Body() dto: CommentDto) {
    return this.commentService.createComment(dto);
  }

  @Get(':id')
  getComments(@GetCurrentUserId() userId: string) {
    return this.commentService.getComments(userId);
  }
}
