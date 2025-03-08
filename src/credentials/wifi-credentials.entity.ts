import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class WifiCredentials {
  @PrimaryColumn()
  id: number = 1; 

  @Column()
  ssid: string;

  @Column()
  password: string;
}