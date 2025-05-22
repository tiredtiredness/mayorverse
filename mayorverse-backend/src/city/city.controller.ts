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
  ParseArrayPipe,
} from '@nestjs/common';
import { CityService } from './city.service';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @UsePipes(new ValidationPipe())
  @Auth()
  @HttpCode(200)
  @Post()
  create(
    @Body() createCityDto: CreateCityDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.cityService.create(createCityDto, userId);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('tags')
    tags?: string,
  ) {
    console.log(name, tags);
    const tagsArray = tags?.length ? tags?.split(',') : [];
    return this.cityService.findAll(name, tagsArray);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cityService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cityService.remove(id);
  }
}
