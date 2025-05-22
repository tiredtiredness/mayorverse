import { Injectable } from '@nestjs/common';
import { CreatePollDto, UpdatePollDto } from './dto/poll.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PollService {
  constructor(private prismaService: PrismaService) {}

  create(createPollDto: CreatePollDto) {
    const { name, description, endDate, isMultiple, postId } = createPollDto;
    const newPoll = this.prismaService.poll.create({
      data: {
        name,
        description,
        endDate,
        isMultiple,
        post: { connect: { id: postId } },
      },
    });
    return newPoll;
  }

  async findAll() {
    return await this.prismaService.poll.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} poll`;
  }

  async update(id: string, updatePollDto: UpdatePollDto) {
    const { name, description, isMultiple } = updatePollDto;
    const updatedPoll = await this.prismaService.poll.update({
      where: { id },
      data: { name, description, isMultiple },
    });
    return updatedPoll;
  }

  remove(id: number) {
    return `This action removes a #${id} poll`;
  }
}
