import {Machine} from '../../../machine/model/machine.model';

export class DistancePrice {
  id: number;
  workCode: string;
  machine: Machine;
  priceType: string;
  price: number;
  rangeMin: number;
  rangeMax: number;
  startDate: Date;
  endDate: Date;
  projectCode: string;


  constructor(workCode: string, machine: Machine, priceType: string, price: number, rangeMin: number, rangeMax: number, startDate: Date, endDate: Date, projectCode: string) {
    this.workCode = workCode;
    this.machine = machine;
    this.priceType = priceType;
    this.price = price;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.startDate = startDate;
    this.endDate = endDate;
    this.projectCode = projectCode;
  }
}
