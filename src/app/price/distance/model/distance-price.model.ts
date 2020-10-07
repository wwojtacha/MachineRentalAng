
export class DistancePrice {
  id: number;
  workCode: string;
  machineInternalId: string;
  priceType: string;
  price: number;
  rangeMin: number;
  rangeMax: number;
  startDate: Date;
  endDate: Date;
  projectCode: string;


  constructor(workCode: string, machineInternalId: string, priceType: string, price: number, rangeMin: number, rangeMax: number, startDate: Date, endDate: Date, projectCode: string) {
    this.workCode = workCode;
    this.machineInternalId = machineInternalId;
    this.priceType = priceType;
    this.price = price;
    this.rangeMin = rangeMin;
    this.rangeMax = rangeMax;
    this.startDate = startDate;
    this.endDate = endDate;
    this.projectCode = projectCode;
  }
}
