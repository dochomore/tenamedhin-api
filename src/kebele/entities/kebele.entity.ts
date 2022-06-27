import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kebele {
  @PrimaryGeneratedColumn('uuid')
  kebleId: string;

  @Column()
  name: string;

  @Column()
  code: string;
}
