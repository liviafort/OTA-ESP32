import { Controller, Get, Post, Body } from '@nestjs/common';

interface WifiCredentials {
  ssid: string;
  password: string;
}

let wifiCredentials: WifiCredentials = {
  ssid: 'Wokwi-GUEST',
  password: '',
};

@Controller('wifi')
export class CredentialsController {
  @Get()
  getCredentials() {
    return wifiCredentials;
  }

  @Post()
  updateCredentials(@Body() newCredentials: WifiCredentials) {
    wifiCredentials = newCredentials;
    return { message: '✅ Credenciais WiFi atualizadas com sucesso!', wifiCredentials };
  }
}


