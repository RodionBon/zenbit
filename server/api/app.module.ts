import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginModule } from './user/user.module';
// import { DealModule } from './deal/deal.module';

@Module({
  imports: [LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
