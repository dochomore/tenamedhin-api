import { Member } from 'src/member/entities/member.entity';
import { Relationship } from 'src/relationship/entities/relationship.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Relationship, (rship) => rship.member)
  @JoinColumn({ name: 'relation' })
  relation: Relationship;

  @ManyToOne(() => Member, (member) => member.families)
  @JoinColumn({ name: 'member' })
  member: Member;
}
