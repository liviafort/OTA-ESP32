import { Body, Controller, Get, Patch } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { Firmware } from './firmware.entity';
import { Repository } from 'typeorm';

@Controller('firmware')
export class FirmwareController {

  constructor(
    @InjectRepository(Firmware)
    private readonly firmwareRepo: Repository<Firmware>,
  ) {}

  @Get()
  async get() {
    const firmware = await this.firmwareRepo.findOne({ where: { selected_firmware: 1 } });
    return firmware || { firmware_url: '', selected_firmware: 1 };
  }

  @Patch()
  async patch(@Body() body: { firmware_url: string, selected_firmware: number }) {
    const firmware = await this.firmwareRepo.findOne({ where: { selected_firmware: body.selected_firmware } });

    if (firmware) {
      firmware.firmware_url = body.firmware_url;
      await this.firmwareRepo.save(firmware);
      return { success: true };
    }

    return { success: false, message: "Firmware não encontrado!" };
  }

  @Get('v1')
  async getFirmwareV1() {
    const firmwarePath = path.resolve(__dirname, 'path/to/esp32/esp32_firmware_v1.bin');
    const firmware = fs.readFileSync(firmwarePath);
    return firmware;
  }

  @Get('v2')
  async getFirmwareV2() {
    const firmwarePath = path.resolve(__dirname, 'path/to/esp32/esp32_firmware_v2.bin');
    const firmware = fs.readFileSync(firmwarePath);
    return firmware;
  }
}
