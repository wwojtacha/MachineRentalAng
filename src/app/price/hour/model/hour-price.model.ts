
export class HourPrice {
  id: number;
  workCode: string;
  machineInternalId: string;
  priceType: string;
  price: number;
  startDate: Date;
  endDate: Date;
  projectCode: string;


  constructor(workCode: string, machineInternalId: string, priceType: string, price: number, startDate: Date, endDate: Date, projectCode: string) {
    this.workCode = workCode;
    this.machineInternalId = machineInternalId;
    this.priceType = priceType;
    this.price = price;
    this.startDate = startDate;
    this.endDate = endDate;
    this.projectCode = projectCode;
  }
}
