import { Controller, Patch, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Selected_Firmware } from './selected-firmware.entity';

@Controller('selected-firmware')
export class SelectedFirmwareController {
  constructor(
    @InjectRepository(Selected_Firmware)
    private readonly selectedFirmwareRepo: Repository<Selected_Firmware>,
  ) {}

  @Patch()
  async patch(@Body() body: { selected_firmware: number }) {
    const selectedFirmware = await this.selectedFirmwareRepo.findOne({ where: { id: 1 } });

    if (selectedFirmware) {
      selectedFirmware.selected_firmware = body.selected_firmware;
      await this.selectedFirmwareRepo.save(selectedFirmware);
      return { success: true };
    }

    return { success: false, message: "Registro não encontrado!" };
  }

}
