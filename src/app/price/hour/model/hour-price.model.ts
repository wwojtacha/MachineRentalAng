import {Machine} from '../../../machine/model/machine.model';

export class HourPrice {
  id: number;
  workCode: string;
  machine: Machine;
  priceType: string;
  price: number;
  startDate: Date;
  endDate: Date;
  projectCode: string;
  modificationDate: Date;


  constructor(workCode: string, machine: Machine, priceType: string, price: number, startDate: Date, endDate: Date, projectCode: string) {
    this.workCode = workCode;
    this.machine = machine;
    this.priceType = priceType;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.projectCode = projectCode;
  }
}
