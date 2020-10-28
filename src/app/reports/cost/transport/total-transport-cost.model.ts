import {TransportCost} from './transport-cost.model';

export class TotalTransportCost {

  // estimatePosition: EstimatePosition;
  transportCosts: TransportCost[];
  totalWorkHoursCount: number;
  totalCostValue: number;


  constructor(transportCosts: TransportCost[], totalWorkHoursCount: number, totalCostValue: number) {
    // this.estimatePosition = estimatePosition;
    this.transportCosts = transportCosts;
    this.totalWorkHoursCount = totalWorkHoursCount;
    this.totalCostValue = totalCostValue;
  }
}
