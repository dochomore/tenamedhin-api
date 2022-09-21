import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Resource { 
  @PrimaryGeneratedColumn('uuid')
  resourceId: string;

  @Column({unique: true})
  resourceName: string;
}
