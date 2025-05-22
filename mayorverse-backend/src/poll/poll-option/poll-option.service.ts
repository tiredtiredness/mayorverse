import { Injectable } from '@nestjs/common';
import {
  CreatePollOptionDto,
  UpdatePollOptionDto,
} from './dto/poll-option.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PollOptionService {
  constructor(private prismaService: PrismaService) {}
  async create(createPollOptionDto: CreatePollOptionDto) {
    const newPollOption = await this.prismaService.pollOption.create({
      data: createPollOptionDto,
    });
    return newPollOption;
  }

  async findAll() {
    return await this.prismaService.pollOption.findMany();
  }

  findOne(id: string) {
    return `This action returns a #${id} pollOption`;
  }

  async update(id: string, updatePollOptionDto: UpdatePollOptionDto) {
    const { name, order } = updatePollOptionDto;
    const updatedPollOption = await this.prismaService.pollOption.update({
      where: { id },
      data: { name, order },
    });
    return updatedPollOption;
  }

  remove(id: string) {
    return `This action removes a #${id} pollOption`;
  }
}
