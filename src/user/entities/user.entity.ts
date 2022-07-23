import { IsDefined } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

  @Column({ unique: true })
  @IsDefined()
  username: string;

  @Column()
  @IsDefined()
  password: string;

}
