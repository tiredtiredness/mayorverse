import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCityDto, UpdateCityDto } from './dto/city.dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAll(name?: string, tags?: string[]) {
    if (tags?.length) {
      return this.prismaService.city.findMany({
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
    } else {
      return this.prismaService.city.findMany({
        include: {
          mayor: { omit: { password: true } },
          tags: true,
          _count: { select: { follows: true } },
        },
        omit: { mayorId: true },
      });
    }
  }

  findOne(id: string) {
    return this.prismaService.city.findUnique({
      where: { id },
      include: {
        posts: {
          include: { user: true, polls: true },
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
