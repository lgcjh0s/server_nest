import { Module } from '@nestjs/common';
import { MpaController } from './mpa.controller';
import { MpaService } from './mpa.service';

@Module({
  controllers: [MpaController],
  providers: [MpaService]
})
export class MpaModule {
  
}
