import {MachineType} from '../../../machine-type/model/machine-type.model';

export class TransportCost {

  // estimatePosition: EstimatePosition;
  machineType: MachineType;
  workHoursCount: number;
  costValue: number;

  constructor(machineType: MachineType, workHoursCount: number, costValue: number) {
    // this.estimatePosition = estimatePosition;
    this.machineType = machineType;
    this.workHoursCount = workHoursCount;
    this.costValue = costValue;
  }
}
