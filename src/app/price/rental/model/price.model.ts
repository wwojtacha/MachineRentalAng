import {Machine} from '../../../machine/model/machine.model';

export class Price {
  id: string;
  year: number;
  priceType: string;
  price: number;
  machine: Machine;


  constructor(year: number, priceType: string, price: number, machine: Machine) {
    this.year = year;
    this.priceType = priceType;
    this.price = price;
    this.machine = machine;
  }
}
