import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikeService {
  constructor(private prismaService: PrismaService) {}

  async toggle(likeDto: LikeDto) {
    const { userId, postId, cityId, commentId, likeType } = likeDto;

    const existingLike = await this.prismaService.like.findFirst({
      where: {
        userId,
        likeType,
        postId,
        cityId,
        commentId,
      },
    });

    if (existingLike) {
      await this.prismaService.like.delete({ where: { id: existingLike.id } });
      return { liked: false };
    }

    await this.prismaService.like.create({
      data: { userId, postId, commentId, cityId, likeType },
    });
    return { liked: true };
  }
}
