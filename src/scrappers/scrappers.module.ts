import { Module } from '@nestjs/common';
import { ScrappersService } from './services/scrappers.service';

@Module({
  providers: [ScrappersService],
  exports: [ScrappersService],
})
export class ScrappersModule {}
