import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { PollService } from './poll.service';
import { CreatePollDto, UpdatePollDto } from './dto/poll.dto';

@Controller('poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  create(@Body() createPollDto: CreatePollDto) {
    return this.pollService.create(createPollDto);
  }

  @Get()
  findAll(@Query('cityId') cityId: string) {
    console.log({ cityId });
    return this.pollService.findAll({ cityId });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePollDto: UpdatePollDto) {
    return this.pollService.update(id, updatePollDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pollService.remove(id);
  }
}
