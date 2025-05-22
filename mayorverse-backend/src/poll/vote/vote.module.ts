import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [VoteController],
  providers: [VoteService, PrismaService],
})
export class VoteModule {}
