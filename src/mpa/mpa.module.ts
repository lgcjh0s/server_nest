import { Module } from '@nestjs/common';
import { MpaController } from './mpa.controller';

@Module({
  controllers: [MpaController]
})
export class MpaModule {
  
}
