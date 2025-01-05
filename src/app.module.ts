import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoryModule } from './memory/memory.module';
import { ScrapModule } from './scrap/scrap.module';
import { CookieModule } from './cookie/cookie.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    MemoryModule, 
    ScrapModule, 
    CookieModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'testuser',
      password: 'test01!',
      database: 'testDB',
      synchronize: false,
      logging: true
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
