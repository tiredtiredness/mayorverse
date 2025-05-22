import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { PollOptionModule } from './poll-option/poll-option.module';
import { VoteModule } from './vote/vote.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PollController],
  providers: [PollService, PrismaService],
  imports: [PollOptionModule, VoteModule],
  exports: [PollService],
})
export class PollModule {}
