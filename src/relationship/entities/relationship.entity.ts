import { Familymember } from 'src/member/familymember/entities/familymember.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Family relationship
 */
@Entity()
export class Relationship {
  @PrimaryGeneratedColumn('uuid')
  relationUid: string;

  @Column()
  relationName: string;

  @Column({ type: 'timestamptz' })
  createdAt: string;

  @Column({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(() => Familymember, (member) => member.relation)
  member: Familymember;
}
