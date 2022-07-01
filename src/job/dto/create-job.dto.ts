import { IsDefined } from 'class-validator';

export class CreateJobDto {
  dateOfCreation?: Date;

  @IsDefined()
  jobName: string;
}
