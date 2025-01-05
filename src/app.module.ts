import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoryModule } from './memory/memory.module';
import { ScrapModule } from './scrap/scrap.module';
import { CookieModule } from './cookie/cookie.module';

@Module({
  imports: [MemoryModule, ScrapModule, CookieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
