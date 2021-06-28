import {Injectable} from '@angular/core';

export class TranslationSet {
  public languange: string;
  public values: { [key: string]: string } = {};
}
@Injectable()
export class TranslationService {
  public languages = ['PL', 'EN'];

  public currentLanguage = 'PL';

  public counter = 0;

  private dictionary: { [key: string]: TranslationSet } = {
    PL: {
      languange: 'PL',
      values: {
        menu: 'Menu',
        machines: 'Maszyny',
        machineTypes: 'Typy maszyn',
        addNewMachine: 'Dodaj maszynę'
      },
    },
    EN: {
      languange: 'EN',
      values: {
        menu: 'Home',
        machines: 'Machines',
        machineTypes: 'Machine types',
        addNewMachine: 'Add new machine'
      },
    },
  };

  constructor() {}

  translate(key: string): string {
    if (this.dictionary[this.currentLanguage] != null) {
      return this.dictionary[this.currentLanguage].values[key];
    }
  }

  updateCounter() {
    this.counter++;
  }
}
