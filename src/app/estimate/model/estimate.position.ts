import {CostCode} from '../../costcode/model/costcode.model';

export class EstimatePosition {

  public id: number;
  public name: string;
  public costCode: CostCode;
  public quantity: number;
  public measureUnit: string;
  public sellPrice: number;
  public sellValue: number;
  public remarks: string;
  public costPrice: number;
  public costValue: number;


  constructor(name: string, costCode: CostCode, quantity: number, measureUnit: string, sellPrice: number, sellValue: number, remarks: string, costPrice: number, costValue: number) {
    this.name = name;
    this.costCode = costCode;
    this.quantity = quantity;
    this.measureUnit = measureUnit;
    this.sellPrice = sellPrice;
    this.sellValue = sellValue;
    this.remarks = remarks;
    this.costPrice = costPrice;
    this.costValue = costValue;
  }
}
