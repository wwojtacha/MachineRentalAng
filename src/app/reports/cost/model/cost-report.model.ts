import {EstimatePosition} from '../../../estimate/model/estimate.position';
import {TotalEquipmentCost} from '../equipment/total-equipment-cost.model';
import {TotalTransportCost} from '../transport/total-transport-cost.model';
import {TotalDeliveryCost} from '../delivery/total-delivery-cost.model';
import {TotalLabourCost} from '../labour/total-labour-cost.model';

export class CostReport {

  estimatePosition: EstimatePosition;
  totalDailyReportQuantity: number;
  totalEquipmentCost: TotalEquipmentCost;
  totalTransportCost: TotalTransportCost;
  totalDeliveryCost: TotalDeliveryCost;
  totalLabourCost: TotalLabourCost;


  constructor(estimatePosition: EstimatePosition,
              totalDailyReportQuantity: number,
              totalEquipmentCost: TotalEquipmentCost,
              totalTransportCost: TotalTransportCost,
              totalDeliveryCost: TotalDeliveryCost,
              totalLabourCost: TotalLabourCost) {
    this.estimatePosition = estimatePosition;
    this.totalDailyReportQuantity = totalDailyReportQuantity;
    this.totalEquipmentCost = totalEquipmentCost;
    this.totalTransportCost = totalTransportCost;
    this.totalDeliveryCost = totalDeliveryCost;
    this.totalLabourCost = totalLabourCost;
  }
}
