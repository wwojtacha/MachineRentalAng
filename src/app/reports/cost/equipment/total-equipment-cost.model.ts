import {EstimatePosition} from '../../../estimate/model/estimate.position';
import {EquipmentCost} from './equipment-cost.model';

export class TotalEquipmentCost {

  // estimatePosition: EstimatePosition;
  equipmentCosts: EquipmentCost[];
  totalWorkHoursCount: number;
  totalCostValue: number;


  constructor(equipmentCosts: EquipmentCost[], totalWorkHoursCount: number, totalCostValue: number) {
    // this.estimatePosition = estimatePosition;
    this.equipmentCosts = equipmentCosts;
    this.totalWorkHoursCount = totalWorkHoursCount;
    this.totalCostValue = totalCostValue;
  }
}
