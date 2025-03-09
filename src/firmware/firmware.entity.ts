import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Firmware {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firmware_url: string; 
  
}
