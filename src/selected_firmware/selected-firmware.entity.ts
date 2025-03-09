import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Selected_Firmware {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  selected_firmware: number; 

}