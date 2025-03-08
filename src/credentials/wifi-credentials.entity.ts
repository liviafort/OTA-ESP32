import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WifiCredentials {
  @PrimaryGeneratedColumn() 
  id: number; 

  @Column({ type: 'varchar', length: 255 })
  ssid: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;
}