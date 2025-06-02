import { Injectable } from '@nestjs/common';
import { CreatePollDto, UpdatePollDto } from './dto/poll.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PollService {
  constructor(private prismaService: PrismaService) {}

  create(createPollDto: CreatePollDto) {
    const { name, description, endDate, isMultiple, postId, cityId } =
      createPollDto;
    const newPoll = this.prismaService.poll.create({
      data: {
        name,
        description,
        endDate,
        isMultiple,
        post: { connect: { id: postId } },
        city: { connect: { id: cityId } },
      },
    });
    return newPoll;
  }

  async findAll({ cityId }: { cityId: string }) {
    console.log({ cityId });
    return await this.prismaService.poll.findMany({
      where: { cityId },
      include: { pollOptions: true, votes: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.poll.findUnique({ where: { id } });
  }

  async update(id: string, updatePollDto: UpdatePollDto) {
    const { name, description, isMultiple } = updatePollDto;
    const updatedPoll = await this.prismaService.poll.update({
      where: { id },
      data: { name, description, isMultiple },
    });
    return updatedPoll;
  }

  async remove(id: string) {
    return await this.prismaService.poll.delete({ where: { id } });
  }
}
