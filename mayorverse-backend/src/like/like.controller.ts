import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeDto } from './dto/like.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  toggle(@Body() likeDto: LikeDto) {
    return this.likeService.toggle(likeDto);
  }
}
