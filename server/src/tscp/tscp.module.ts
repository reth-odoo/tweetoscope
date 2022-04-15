import { Module } from '@nestjs/common';
import { TscpService } from './tscp.service';
import { TscpController } from './tscp.controller';

@Module({
  controllers: [TscpController],
  providers: [TscpService],
})
export class TscpModule {}
