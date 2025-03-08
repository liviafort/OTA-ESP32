import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CredentialsController } from './credentials/credentials.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WifiCredentials } from './credentials/wifi-credentials.entity';

@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        synchronize: true,
        entities: [WifiCredentials],
      }),
      TypeOrmModule.forFeature([WifiCredentials])
  ],
  controllers: [AppController, CredentialsController],
  providers: [AppService],
})
export class AppModule {}
