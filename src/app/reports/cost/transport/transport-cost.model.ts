import {MachineType} from '../../../machine-type/model/machine-type.model';

export class TransportCost {

  // estimatePosition: EstimatePosition;
  machineType: MachineType;
  priceType: string;
  workHoursCount: number;
  distanceCount: number;
  quantityCount: number;
  costValue: number;

  constructor(machineType: MachineType, priceType: string,
              workHoursCount: number, distanceCount: number, quantityCount: number,
              costValue: number) {
    // this.estimatePosition = estimatePosition;
    this.machineType = machineType;
    this.priceType = priceType;
    this.workHoursCount = workHoursCount;
    this.distanceCount = distanceCount;
    this.quantityCount = quantityCount;
    this.costValue = costValue;
  }
}
