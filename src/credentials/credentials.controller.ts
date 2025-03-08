import { Controller, Get, Post, Body } from '@nestjs/common';
import { WifiCredentials } from './wifi-credentials.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Controller('wifi')
export class CredentialsController {
  constructor(
    @InjectRepository(WifiCredentials)
    private readonly wifiRepo: Repository<WifiCredentials>,
  ) {}

  @Get()
  async getCredentials() {
    try {
      const credentials = await this.wifiRepo.findOne({ where: { id: 1 } });
      return credentials || {
        ssid: 'iPhone de João',
        password: 'jvssenha'
      };
    } catch (error) {
      return { message: 'Erro ao acessar o banco de dados', error };
    }
  }

  @Post()
  async updateCredentials(@Body() newCredentials: WifiCredentials) {
    try {
      const existing = await this.wifiRepo.findOne({ where: { id: 1 } });

      if (existing) {
        await this.wifiRepo.update(1, newCredentials);
      } else {
        await this.wifiRepo.insert({ ...newCredentials, id: 1 });
      }

      return await this.wifiRepo.findOne({ where: { id: 1 } });
    } catch (error) {
      return { message: 'Erro ao atualizar as credenciais', error };
    }
  }
}
