import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PollOptionService } from './poll-option.service';
import {
  CreatePollOptionDto,
  UpdatePollOptionDto,
} from './dto/poll-option.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('poll-option')
export class PollOptionController {
  constructor(private readonly pollOptionService: PollOptionService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createPollOptionDto: CreatePollOptionDto) {
    return this.pollOptionService.create(createPollOptionDto);
  }

  @Get()
  findAll() {
    return this.pollOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pollOptionService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('id') id: string,
    @Body() updatePollOptionDto: UpdatePollOptionDto,
  ) {
    return this.pollOptionService.update(id, updatePollOptionDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.pollOptionService.remove(id);
  }
}
