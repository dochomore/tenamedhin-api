export class CreateMemberDto {
  dateOfRegistration: string;
  memberId?: string;
  firstName: string;
  fatherName: string;
  gfName: string;
  gender: string;
  age: number;
  willPay: boolean;
  idCardIssued?: boolean;
}
