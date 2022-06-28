import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Healthcare {
  @PrimaryGeneratedColumn()
  healthcareId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  code: string;
}
