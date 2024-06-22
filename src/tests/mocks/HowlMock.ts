import {Howl, HowlOptions} from 'howler';
export class HowlMock implements Partial<Howl>{
  constructor(public config: HowlOptions) {
  }

  play(id?: number): number{
    return 0;
  }
}