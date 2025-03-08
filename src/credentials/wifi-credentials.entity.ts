import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class WifiCredentials {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column()
  ssid: string;

  @Column()
  password: string;
}