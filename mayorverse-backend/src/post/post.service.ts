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

  async findAll() {
    const posts = await this.prismaService.post.findMany({
      include: { user: { select: { username: true } } },
    });
    console.log(posts);
    return posts;
  }

  async findOne(id: string) {
    return this.prismaService.post.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const { name, content } = updatePostDto;
    const updatedPost = await this.prismaService.post.update({
      data: { name, content },
      where: { id },
    });
    return updatedPost;
  }

  remove(id: string) {
    const post = this.prismaService.post.delete({ where: { id } });
    return post;
  }
}
