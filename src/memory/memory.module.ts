import { Module } from '@nestjs/common';
import { MemoryService } from './memory.service';
import { MemoryController } from './memory.controller';
import { CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComCode } from 'src/entity/comcode.entity';

@Module({
  imports: [
    CacheModule.register(),
    TypeOrmModule.forFeature([
      ComCode
    ])
  ],
  providers: [MemoryService],
  controllers: [MemoryController]
})
export class MemoryModule {}
