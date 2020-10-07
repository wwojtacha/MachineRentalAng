export class CostCode {

  public id: number;
  public projectCode: string;
  public costType: string;
  public projectCodeDescription: string;
  public costTypeDescription: string;
  public fullCode: string;


  constructor(projectCode: string, costType: string, projectCodeDescription: string, costTypeDescription: string, fullCode?: string) {
    this.projectCode = projectCode;
    this.costType = costType;
    this.projectCodeDescription = projectCodeDescription;
    this.costTypeDescription = costTypeDescription;
    this.fullCode = fullCode;
  }
}
