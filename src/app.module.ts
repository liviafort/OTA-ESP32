import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wifi } from './credentials/wifi-credentials.entity';
import { WifiController } from './credentials/credentials.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
      entities: [Wifi],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Wifi])
  ],
  controllers: [WifiController],
})
export class AppModule {}