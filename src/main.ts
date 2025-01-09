import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from './common/common.logger';
import Handlebars from 'handlebars';

async function bootstrap() {

  const logger = Logger();
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'service'));
  app.setViewEngine('hbs');

  Handlebars.registerHelper('comma', (num: number) => num.toLocaleString());

  await app.listen(process.env.PORT ?? 3000);

  logger.info('Server started!');
}
bootstrap();