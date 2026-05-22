import type { StudentADT } from "./StudentADT";

export abstract class StudentBase implements StudentADT {
  protected _name: string;
  protected _mainLanguage: string;
  protected _mental = 100;
  protected _intelligence = 0;
  protected _points = 0;

  constructor(name: string, mainLanguage: string) {
    this._name = name;
    this._mainLanguage = mainLanguage;
  }

  get name(): string {
    return this._name;
  }

  get mainLanguage(): string {
    return this._mainLanguage;
  }

  get mental(): number {
    return this._mental;
  }

  get intelligence(): number {
    return this._intelligence;
  }

  get points(): number {
    return this._points;
  }

  applyBonus(intelligence: number, mental: number): void {
    this._intelligence += intelligence;
    this._mental += mental;
    this._mental = Math.max(0, this._mental);
  }

  abstract study(): string;
  abstract introduce(): string;
  abstract takeExam(): string;
}
