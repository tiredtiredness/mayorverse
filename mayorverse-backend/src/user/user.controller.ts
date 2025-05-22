import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UpdateUserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile') // Путь к эндпоинту, например /user/profile или /user/me
  @HttpCode(200) // HTTP-статус 200 (OK)
  @UseGuards(AuthGuard('jwt')) // Защищаем этот эндпоинт с помощью JWT Guard
  // Используем декоратор @User('id'), чтобы получить ID пользователя из запроса
  async getProfile(@CurrentUser('id') userId: string) {
    // Guard уже проверил токен и прикрепил user к запросу.
    // @User('id') извлек req.user.id (или req.user.sub, в зависимости от вашей стратегии и декоратора).
    // Теперь вызываем метод сервиса для получения профиля по этому ID.
    return this.userService.getProfile(userId); // Используем метод getProfile из сервиса
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get()
  findMany() {
    return this.userService.findAll();
  }

  @HttpCode(200)
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  update(
    @CurrentUser('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(userId, updateUserDto);
  }
}
