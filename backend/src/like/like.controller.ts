import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { LikeDto } from './dto/like.dto';
import { LikeService } from './like.service';

@Public()
@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) { }

  @Post()
  addLike(@Body() dto: LikeDto) {
    return this.likeService.addLike(dto);
  }

  @Delete(':id')
  removeLike(@Param('id') id: string) {
    return this.likeService.removeLike(id);
  }
}
