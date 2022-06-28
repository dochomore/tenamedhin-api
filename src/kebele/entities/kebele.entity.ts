import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Kebele {
  @PrimaryGeneratedColumn('uuid')
  kebeleId: string;

  @Column({ unique: true })
  name: string;

  @Column()
  code: string;
}
