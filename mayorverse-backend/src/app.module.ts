import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { PostModule } from './post/post.module';
import { PollModule } from './poll/poll.module';
import { FollowModule } from './follow/follow.module';
import { TagModule } from './tag/tag.module';
import { LikeModule } from './like/like.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CityModule,
    PostModule,
    PollModule,
    FollowModule,
    TagModule,
    LikeModule,
    CommentModule,
  ],
  controllers: [UserController],
})
export class AppModule {}
