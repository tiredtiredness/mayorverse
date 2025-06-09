import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dto/post.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prismaService: PrismaService) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.prismaService.post.create({
      data: {
        name: createPostDto.name,
        content: createPostDto.content,
        user: { connect: { id: createPostDto.userId } },
        city: { connect: { id: createPostDto.cityId } },
      },
    });
    return newPost;
  }

  async findAll({ cityId, userId }: { cityId: string; userId: string }) {
    console.log({ cityId });
    const posts = await this.prismaService.post.findMany({
      where: { cityId },
      include: {
        user: true,
        tags: { select: { name: true } },
        _count: { select: { likes: true, comments: true } },
        likes: { where: { userId } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return posts.map((post) => ({
      ...post,
      isLiked: post.likes.length > 0,
      likesCount: post._count.likes,
      commentsCount: post._count.comments,
    }));
  }

  async findOne({ postId, userId }: { postId: string; userId: string }) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        tags: true,
        _count: { select: { likes: true } },
        likes: { where: { userId } },
      },
    });

    return (
      !!post && {
        ...post,
        isLiked: post.likes.length > 0,
        likesCount: post?._count.likes,
      }
    );
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { name, content } = updatePostDto;
    const updatedPost = await this.prismaService.post.update({
      where: { id },
      data: { name, content },
    });
    return updatedPost;
  }

  remove(id: string) {
    const post = this.prismaService.post.delete({ where: { id } });
    return post;
  }
}
