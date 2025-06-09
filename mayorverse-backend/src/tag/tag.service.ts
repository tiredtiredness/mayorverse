import { Injectable } from '@nestjs/common';
import { CreateTagDto, UpdateTagDto } from './dto/tag.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TagService {
  constructor(private prismaService: PrismaService) {}

  async findAll({ cityId, popular }: { cityId?: string; popular?: boolean }) {
    if (popular) {
      const popularTags = await this.prismaService.tag.groupBy({
        by: ['name'],
        _count: { _all: true },
        orderBy: { _count: { name: 'desc' } },
        take: 10,
      });
      const formattedTags = popularTags.map((item) => ({
        name: item.name,
      }));

      return formattedTags;
    }

    const tags = await this.prismaService.tag.findMany({
      where: { cityId },
      include: { city: true },
    });
    return tags;
  }

  async create(createTagDto: CreateTagDto) {
    const newTag = await this.prismaService.tag.create({
      data: {
        name: createTagDto.name,
        cityId: createTagDto.cityId,
        postId: createTagDto.postId,
        type: createTagDto.cityId ? 'CITY' : 'POST',
      },
    });
    return newTag;
  }

  async findOne(id: string) {
    return await this.prismaService.tag.findUnique({ where: { id } });
  }

  async remove(id: string) {
    return await this.prismaService.tag.delete({
      where: { id },
    });
  }
}
