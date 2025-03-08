import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsController } from './credentials/credentials.controller';

@Module({
  imports: [],
  controllers: [AppController, CredentialsController],
  providers: [AppService],
})
export class AppModule {}
