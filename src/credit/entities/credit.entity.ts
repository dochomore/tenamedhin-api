import { IsNumber, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn('uuid')
  creditId: string;

  @Column()
  @IsNumber()
  @Min(0)
  card: number;

  @Min(0)
  @Column()
  @IsNumber()
  laboratory: number;

  @Min(0)
  @Column()
  @IsNumber()
  imaging: number;

  @Min(0)
  @Column()
  @IsNumber()
  procedure: number;

  @Column()
  @IsNumber()
  @Min(0)
  medicine: number;

  @Column()
  @IsNumber()
  @Min(0)
  bed: number;

  @Column()
  @IsNumber()
  @Min(0)
  others: number;

  @IsString()
  @Column()
  comment: string;
}
