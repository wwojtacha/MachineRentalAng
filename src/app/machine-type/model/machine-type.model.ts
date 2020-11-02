export class MachineType {

  id: number;
  machineType: string;
  costCategory: string;

  constructor(machineType: string, costCategory: string) {
    this.machineType = machineType;
    this.costCategory = costCategory;
  }
}
