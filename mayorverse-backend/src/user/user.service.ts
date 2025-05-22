import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { hash } from 'argon2';

import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        cities: { include: { mayor: true } },
        posts: true,
        follows: { include: { city: { include: { mayor: true } } } },
        followedUsers: true,
        votes: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  getByUsername(username: string) {
    return this.prisma.user.findUnique({
      where: { username },
    });
  }

  async getProfile(id: string) {
    const user = await this.getById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return profile;
  }

  async create(dto: AuthDto) {
    const data = {
      email: dto.email,
      username: dto.username,
      password: await hash(dto.password),
    };

    const user = await this.prisma.user.create({
      data,
    });
    if (!user) {
      throw new BadRequestException("Can't create new user");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return profile;
  }

  async findAll() {
    const users = await this.prisma.user.findMany({ omit: { password: true } });
    return users;
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        cities: true,
        posts: true,
        follows: true,
        followedUsers: true,
        votes: true,
      },
    });
    if (!user) {
      throw new BadRequestException("Can't create new user");
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...profile } = user;
    return profile;
  }

  async update(id: string, userDto: UpdateUserDto) {
    const oldUser = await this.prisma.user.findUnique({
      where: { username: userDto.username },
    });
    if (oldUser?.id !== id) {
      throw new ConflictException('User already exist');
    }

    return this.prisma.user.update({
      where: { id },
      data: { ...userDto },
    });
  }
}
