import { Module } from '@nestjs/common';
import { PollOptionService } from './poll-option.service';
import { PollOptionController } from './poll-option.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PollOptionController],
  providers: [PollOptionService, PrismaService],
  exports: [PollOptionService],
})
export class PollOptionModule {}
