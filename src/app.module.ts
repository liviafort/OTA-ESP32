import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wifi } from './credentials/wifi-credentials.entity';
import { WifiController } from './credentials/credentials.controller';
import { FirmwareController } from './firmware/firmware.controller';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { Firmware } from './firmware/firmware.entity';
import { SelectedFirmwareController } from './selected_firmware/selected_firmware.controller';
import { Selected_Firmware } from './selected_firmware/selected-firmware.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'esp32'),
      serveRoot: '/esp32',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      ssl: true,
      extra: { ssl: { rejectUnauthorized: false } },
      entities: [Wifi, Firmware, Selected_Firmware],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Wifi, Firmware, Selected_Firmware])
  ],
  controllers: [WifiController, FirmwareController, SelectedFirmwareController],
})
export class AppModule {}