import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { DatabaseConfig } from './configs/configuration.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger(bootstrap.name);
  const configService = app.get(ConfigService);
  const databaseEnv = configService.get<DatabaseConfig>('database');
  logger.log(databaseEnv);
  await app.listen(configService.get('PORT'), () => {
    logger.log(`Application running on port ${configService.get('PORT')}`);
  });
}
bootstrap();
