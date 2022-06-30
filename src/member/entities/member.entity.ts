import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Tena medhin Member
 */
@Entity()
export class Member {
  @PrimaryGeneratedColumn('uuid')
  memberUid: string;

  @Column({ type: 'timestamptz' })
  dateOfRegistration: string;

  // member id issued by woreda office
  @Column({ nullable: true })
  memberId: string;

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

  @Column({ default: true })
  willPay: boolean;

  @Column({ default: false })
  idCardIssued: boolean;
}
