export class CostCode {

  public id: number;
  public projectCode: string;
  public costType: string;
  public fullCode: string;


  constructor(projectCode: string, costType: string, fullCode?: string) {
    this.projectCode = projectCode;
    this.costType = costType;
    this.fullCode = fullCode;
  }
}
