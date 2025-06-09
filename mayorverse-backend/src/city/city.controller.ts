import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(200)
  @UseGuards(AuthGuard('jwt'))
  create(
    @Body() createCityDto: CreateCityDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.cityService.create(createCityDto, userId);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('tags') tags?: string,
    @Query('userId') userId?: string,
    @Query('isFollowing') isFollowing?: boolean,
  ) {
    const tagsArray = tags?.length ? tags?.split(',') : [];
    return this.cityService.findAll({
      name,
      tags: tagsArray,
      userId,
      isFollowing,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
