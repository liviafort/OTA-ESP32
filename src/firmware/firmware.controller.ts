import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { Response } from 'express';
import { Firmware } from './firmware.entity';
import { Repository } from 'typeorm';
import { Selected_Firmware } from 'src/selected_firmware/selected-firmware.entity';

@Controller('firmware')
export class FirmwareController {

  constructor(
    @InjectRepository(Firmware)
    private readonly firmwareRepo: Repository<Firmware>,
    @InjectRepository(Selected_Firmware)
    private readonly selectedFirmwareRepo: Repository<Selected_Firmware>
  ) {}

  @Get('/recebe')
  async get() {
    const selectedFirmware = await this.selectedFirmwareRepo.findOne({ where: { id: 1 } });
    
    if (selectedFirmware) {
      const firmware = await this.firmwareRepo.findOne({ where: { id: selectedFirmware.selected_firmware } });
      return firmware || { firmware_url: '', selected_firmware: selectedFirmware.selected_firmware };
    }
    
    return { success: false, message: "No selected firmware" };
  }

  @Post('/envio')
  async posturl(@Body() body: { firmware_url: string }) {
    const firmware = new Firmware();
    firmware.firmware_url = body.firmware_url;
    await this.firmwareRepo.save(firmware);
    return { success: true, firmware };
  }

  @Get('v1')
  async getFirmwareV1(@Res() res: Response) {
    try {
      const firmware = fs.readFileSync('esp32/esp32_firmware_v1.bin');
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=esp32_firmware_v1.bin');
      return res.send(firmware);
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
      throw new Error('Erro ao carregar o firmware v1');
    }
  }

  @Get('v2')
  async getFirmwareV2(@Res() res: Response) {
    try {
      const firmware = fs.readFileSync('esp32/esp32_firmware_v2.bin');
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', 'attachment; filename=esp32_firmware_v2.bin');
      return res.send(firmware);
    } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
      throw new Error('Erro ao carregar o firmware v2');
    }
  }

}
