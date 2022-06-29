import { IsNumber, IsString, Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Credit {
  @PrimaryGeneratedColumn('uuid')
  creditId: string;

  @Column({ default: 0.0, type: 'numeric' })
  @IsNumber()
  @Min(0)
  card: number;

  @Min(0)
  @IsNumber()
  @Column({ default: 0.0, type: 'numeric' })
  labratory: number;

  @Min(0)
  @IsNumber()
  @Column({ default: 0.0, type: 'numeric' })
  imaging: number;

  @Min(0)
  @IsNumber()
  @Column({ default: 0.0, type: 'numeric' })
  procedure: number;

  @IsNumber()
  @Min(0)
  @Column({ default: 0.0, type: 'numeric' })
  medicine: number;

  @IsNumber()
  @Column({ default: 0.0, type: 'numeric' })
  @Min(0)
  bed: number;

  @IsNumber()
  @Min(0)
  @Column({ default: 0.0, type: 'numeric' })
  others: number;

  @IsString()
  @Column({ default: '' })
  comment: string;
}
