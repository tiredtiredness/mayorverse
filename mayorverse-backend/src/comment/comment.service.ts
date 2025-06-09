import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prismaService: PrismaService) {}

  async create(createCommentDto: CreateCommentDto) {
    const comment = await this.prismaService.comment.create({
      data: { ...createCommentDto },
    });
    return comment;
  }

  async findAll({ postId, userId }: { postId: string; userId: string }) {
    const comments = await this.prismaService.comment.findMany({
      where: { postId },
      include: {
        user: true,
        likes: { where: { userId } },
        _count: { select: { likes: true } },
        parent: { include: { user: true } },
      },
      orderBy: { createdAt: 'asc' },
    });

    return comments.map((comment) => ({
      ...comment,
      isLiked: comment.likes.length > 0,
      likesCount: comment._count.likes,
    }));
  }

  findOne(id: string) {
    return `This action returns a #${id} comment`;
  }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  remove(id: string) {
    return `This action removes a #${id} comment`;
  }
}
