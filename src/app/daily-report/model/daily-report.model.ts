import {EstimatePosition} from '../../estimate/model/estimate.position';

export class DailyReport {

  id: number;
  date: Date;
  estimatePosition: EstimatePosition;
  location: string;
  startPoint: string;
  endPoint: string;
  side: string;
  quantity: number;
  measureUnit: string;
  remarks: string;


  constructor(date: Date, estimatePosition: EstimatePosition, location: string, startPoint: string, endPoint: string, side: string, quantity: number, measureUnit: string, remarks: string) {
    this.date = date;
    this.estimatePosition = estimatePosition;
    this.location = location;
    this.startPoint = startPoint;
    this.endPoint = endPoint;
    this.side = side;
    this.quantity = quantity;
    this.measureUnit = measureUnit;
    this.remarks = remarks;
  }
}
