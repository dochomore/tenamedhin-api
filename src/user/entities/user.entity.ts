import { IsDefined } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';
import {
  Column,
  Entity, JoinTable, ManyToOne, OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';

/**
 * Tena medhin system user
 */

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  @IsDefined()
  username: string;

  @Column()
  @IsDefined()
  firstName: string;

  @Column()
  @IsDefined()
  fatherName: string;

  @Column()
  @IsDefined()
  createdAt: string;

  @Column()
  @IsDefined()
  updatedAt: string;

  @Column()
  @IsDefined()
  password: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  refreshToken: string;

  @ManyToOne(() => Role, (role) => role.user)
  @JoinTable()
  role: Role;
  
}
