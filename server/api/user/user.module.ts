import { Module } from '@nestjs/common';
import { LoginService } from './user.service';
import { LoginController } from './user.controller';

@Module({
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
