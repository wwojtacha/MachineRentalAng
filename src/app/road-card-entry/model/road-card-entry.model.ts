import {Time} from '@angular/common';
import {WorkDocument} from '../../work-document/model/work-document.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {CostCode} from '../../costcode/model/costcode.model';
import {DistancePrice} from '../../price/distance/model/distance-price.model';
import {Material} from '../../material/model/material.model';

export class RoadCardEntry {

  id: number;
  workCode: string;
  startHour: Time;
  endHour: Time;
  loadingPlace: string;
  material: Material;
  unloadingPlace: string;
  quantity: number;
  measureUnit: string;
  distance: number;
  distancePrice: DistancePrice;
  estimatePosition: EstimatePosition;
  costCode: CostCode;
  acceptingPerson: string;
  workDocument: WorkDocument;


  constructor(workCode: string, startHour: Time, endHour: Time, loadingPlace: string, materialType: Material, unloadingPlace: string, quantity: number, measureUnit: string, distance: number, distancePrice: DistancePrice, estimatePosition: EstimatePosition, costCode: CostCode, acceptingPerson: string, workDocument: WorkDocument) {
    this.workCode = workCode;
    this.startHour = startHour;
    this.endHour = endHour;
    this.loadingPlace = loadingPlace;
    this.material = materialType;
    this.unloadingPlace = unloadingPlace;
    this.quantity = quantity;
    this.measureUnit = measureUnit;
    this.distance = distance;
    this.distancePrice = distancePrice;
    this.estimatePosition = estimatePosition;
    this.costCode = costCode;
    this.acceptingPerson = acceptingPerson;
    this.workDocument = workDocument;
  }
}
