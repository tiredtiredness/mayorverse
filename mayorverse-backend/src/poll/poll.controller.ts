import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto, UpdatePollDto } from './dto/poll.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  findAll(@Query('cityId') cityId: string) {
    return this.pollService.findAll({ cityId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollService.update(id, updatePollDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.pollService.remove(id);
  }
}
