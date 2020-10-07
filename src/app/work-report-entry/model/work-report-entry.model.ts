import {Time} from '@angular/common';
import {WorkDocument} from '../../work-document/model/work-document.model';
import {CostCode} from '../../costcode/model/costcode.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {HourPrice} from '../../price/hour/model/hour-price.model';

export class WorkReportEntry {

  id: number;
  workCode: string;
  startHour: Time;
  endHour: Time;
  placeOfWork: string;
  typeOfWork: string;
  workQuantity: number;
  measureUnit: string;
  hourPrice: HourPrice;
  estimatePosition: EstimatePosition;
  costCode: CostCode;
  acceptingPerson: string;
  workDocument: WorkDocument;


  constructor(workCode: string, startHour: Time, endHour: Time, placeOfWork: string, typeOfWork: string, workQuantity: number, measureUnit: string, hourPrice: HourPrice, estimatePosition: EstimatePosition, costCode: CostCode, acceptingPerson: string, workDocument: WorkDocument) {
    this.workCode = workCode;
    this.startHour = startHour;
    this.endHour = endHour;
    this.placeOfWork = placeOfWork;
    this.typeOfWork = typeOfWork;
    this.workQuantity = workQuantity;
    this.measureUnit = measureUnit;
    this.hourPrice = hourPrice;
    this.estimatePosition = estimatePosition;
    this.costCode = costCode;
    this.acceptingPerson = acceptingPerson;
    this.workDocument = workDocument;
  }
}
