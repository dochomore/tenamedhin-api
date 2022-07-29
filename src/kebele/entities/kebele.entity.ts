import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 * Government adminstrative unit Kebele
 */
@Entity()
export class KebeleOffice {
  @PrimaryGeneratedColumn('uuid')
  kebeleId: string;

  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  code: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

  @Column()
  createdBy: string;

  @Column()
  updatedBy: string;

  @Column()
  woredaId: string;
}
