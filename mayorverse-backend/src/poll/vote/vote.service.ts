import { Injectable } from '@nestjs/common';
import { CreateVoteDto, UpdateVoteDto } from './dto/create-vote.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VoteService {
  constructor(private prismaService: PrismaService) {}
  async create(createVoteDto: CreateVoteDto) {
    const newVote = await this.prismaService.vote.create({
      data: createVoteDto,
    });
    return newVote;
  }

  async findAll() {
    return await this.prismaService.vote.groupBy({
      by: ['pollOptionId'],
      _count: { id: true },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.vote.findUnique({ where: { id } });
  }

  async update(id: string, updateVoteDto: UpdateVoteDto) {
    const { pollOptionId, userId, pollId } = updateVoteDto;
    const updatedVote = await this.prismaService.vote.update({
      where: { id },
      data: { pollOptionId },
    });
    return updatedVote;
  }

  remove(id: string) {
    return `This action removes a #${id} vote`;
  }
}
