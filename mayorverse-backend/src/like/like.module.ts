import { Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, PrismaService],
  exports: [LikeService],
})
export class LikeModule {}
