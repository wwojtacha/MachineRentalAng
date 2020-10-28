import {EstimatePosition} from '../../../estimate/model/estimate.position';
import {TotalEquipmentCost} from '../equipment/total-equipment-cost.model';

export class CostReport {

  estimatePosition: EstimatePosition;
  totalDailyReportQuantity: number;
  totalEquipmentCost: TotalEquipmentCost;
  totalDeliveryCost: number;


  constructor(estimatePosition: EstimatePosition,
              totalDailyReportQuantity: number,
              totalEquipmentCost: TotalEquipmentCost,
              totalDeliveryCost: number) {
    this.estimatePosition = estimatePosition;
    this.totalDailyReportQuantity = totalDailyReportQuantity;
    this.totalEquipmentCost = totalEquipmentCost;
    this.totalDeliveryCost = totalDeliveryCost;
  }
}
