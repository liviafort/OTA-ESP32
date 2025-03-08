import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'], 
  });
  app.enableCors();
  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`✅ Production ready on ${await app.getUrl()}/wifi`);
}
bootstrap();