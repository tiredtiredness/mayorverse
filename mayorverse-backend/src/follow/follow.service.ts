import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/follow.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FollowService {
  constructor(private prismaService: PrismaService) {}

  async create(createFollowDto: CreateFollowDto) {
    const { cityId, followerId, userId } = createFollowDto;
    const newFollow = await this.prismaService.follow.create({
      data: {
        follower: { connect: { id: followerId } },
        followType: cityId ? 'CITY' : 'USER',
        ...(cityId
          ? { city: { connect: { id: cityId } } }
          : { user: { connect: { id: userId } } }),
      },
    });
    return newFollow;
  }

  async findAll() {
    return await this.prismaService.follow.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.follow.findUnique({ where: { id } });
  }

  async remove(id: string) {
    await this.prismaService.follow.delete({
      where: { id },
    });
    return true;
  }
}
