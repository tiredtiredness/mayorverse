import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/follow.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  // @Auth()
  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(createFollowDto);
  }

  @Get()
  findAll() {
    return this.followService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.followService.findOne(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.followService.remove(id);
  }
}
