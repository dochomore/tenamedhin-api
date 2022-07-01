import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Familymember {
  @PrimaryGeneratedColumn('uuid')
  memberUID: string;

  @Column({ type: 'timestamptz' })
  dateOfRegistration: Date;

  @Column()
  firstName: string;

  @Column()
  fatherName: string;

  @Column()
  gfName: string;

  @Column()
  gender: string;

  @Column()
  age: number;

  @Column({ type: 'date' })
  dateOfBirth: Date;
}
