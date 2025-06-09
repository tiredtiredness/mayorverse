import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  findAll(@Query('postId') postId: string, @Query('userId') userId: string) {
    return this.commentService.findAll({ postId, userId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commentService.findOne(id);
  }

  // @Patch(':id')
  // @UseGuards(AuthGuard('jwt'))
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentService.update(id, updateCommentDto);
  // }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.commentService.remove(id);
  }
}
