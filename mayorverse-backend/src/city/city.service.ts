import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { City } from '@prisma/client';

@Injectable()
export class CityService {
  constructor(private prismaService: PrismaService) {}

  async create(createCityDto: CreateCityDto, userId: string) {
    const city = await this.prismaService.city.create({
      data: { ...createCityDto, mayor: { connect: { id: userId } } },
    });

    if (!city) {
      throw new BadRequestException("Can't create new city");
    }
    return city;
  }

  async findAll({
    name,
    tags,
    userId,
    isFollowing,
  }: {
    name?: string;
    tags?: string[];
    userId?: string;
    isFollowing?: boolean;
  }) {
    let cities: any = [];
    if (tags?.length) {
      cities = await this.prismaService.city.findMany({
        where: {
          tags: { some: { name: { in: tags } } },
          name: { contains: name, mode: 'insensitive' },
        },
        include: {
          mayor: { omit: { password: true } },
          tags: true,
          _count: { select: { follows: true } },
        },
        omit: { mayorId: true },
      });
    } else if (isFollowing) {
      cities = await this.prismaService.city.findMany({
        where: {
          follows: { some: { followerId: userId } },
        },
        include: {
          mayor: { omit: { password: true } },
          follows: true,
          tags: true,
          _count: { select: { follows: true } },
        },
        omit: { mayorId: true },
      });
    } else {
      cities = await this.prismaService.city.findMany({
        where: {
          mayorId: userId,
        },
        include: {
          mayor: { omit: { password: true } },
          tags: true,
          _count: { select: { follows: true } },
        },
        omit: { mayorId: true },
      });
    }
    return cities.map((city) => ({
      ...city,
      followersCount: city._count.follows,
      _count: undefined,
    }));
  }

  findOne(id: string) {
    return this.prismaService.city.findUnique({
      where: { id },
      include: {
        posts: {
          include: { user: true, polls: true, tags: true },
          orderBy: { createdAt: 'desc' },
        },
        mayor: true,
        polls: { include: { pollOptions: true } },
        follows: {
          select: { follower: { select: { id: true, username: true } } },
        },
        _count: { select: { follows: true } },
      },
    });
  }

  update(id: string, updateCityDto: UpdateCityDto) {
    return this.prismaService.city.update({
      where: { id },
      data: { ...updateCityDto },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} city`;
  }
}
