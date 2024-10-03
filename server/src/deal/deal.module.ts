import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';

@Module({
  providers: [DealService],
  controllers: [DealController],
})
export class DealModule {}
