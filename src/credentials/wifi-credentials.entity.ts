import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class WifiCredentials {
  @PrimaryColumn()
  id: number = 1;

  @Column({ type: 'varchar' })
  ssid: string;

  @Column({ type: 'varchar' })
  password: string;
}