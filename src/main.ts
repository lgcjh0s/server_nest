import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Logger } from './common/common.logger';

async function bootstrap() {

  const logger = Logger();
  const handlebars = require('express-handlebars');
  const helpers = require('handlebars-helpers');
  const hbs = handlebars.create({
    extname: 'hbs',
    helpers: helpers
  });
  
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  //app.setBaseViewsDir(join(__dirname, '..', 'service'));
  //app.setViewEngine('hbs', hbs());
  //app.engine('handlebars', exphbs());
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', join(__dirname, '..', 'service'));
  helpers.eq = (v1, v2, options) => {
    return v1 === v2 ? options.fn() : options.inverse();
  };
  await app.listen(process.env.PORT ?? 3000);

  logger.info('Server started!');
}
bootstrap();