export interface StudentADT {
  readonly name: string;
  readonly mainLanguage: string;
  readonly mental: number;
  readonly intelligence: number;
  readonly points: number;
  study(): string;
  introduce(): string;
  takeExam(): string;
}
