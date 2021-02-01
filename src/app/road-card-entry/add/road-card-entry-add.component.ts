import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RoadCardEntry} from '../model/road-card-entry.model';
import {ActivatedRoute, Router} from '@angular/router';
import {RoadCardEntryRepositoryService} from '../repository-service/road-card-entry-repository.service';
import {RoadCardEntryService} from '../service/road-card-entry.service';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../../costcode/model/costcode.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {EstimatePositionRepositoryService} from '../../estimate/repository-service/estimate-position-repository.service';
import {HttpParams} from '@angular/common/http';
import {DistancePriceRepositoryService} from '../../price/distance/repository-service/distance-price-repository.service';
import {WorkDocument} from '../../work-document/model/work-document.model';
import {Material} from '../../material/model/material.model';
import {MaterialRepositoryService} from '../../material/repository-service/material-repository.service';
import {DistancePrice} from '../../price/distance/model/distance-price.model';
import {Operator} from '../../operator/model/operator.model';
import {OperatorRepositoryService} from '../../operator/repository-service/operator-repository.service';

@Component({
  selector: 'app-road-card-entry-add',
  templateUrl: './road-card-entry-add.component.html',
  styleUrls: ['./road-card-entry-add.component.css']
})
export class RoadCardEntryAddComponent implements OnInit {

  static HOUR_UNIT = 'h';

  roadCardEntryForm: FormGroup;
  isOnEdit = history.state.workDocument && history.state.roadCardEntry;
  roadCardEntries: RoadCardEntry[] = [];
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  costTypes: string[] = [];
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);
  isEstimatePositionShown = !this.isOnEdit;
  distancePrices = new BehaviorSubject<DistancePrice[]>([]);
  distancePrice;
  // materials = new BehaviorSubject<Material[]>([]);
  isMaterialShown = !this.isOnEdit;
  acceptingPersons = new BehaviorSubject<Operator[]>([]);
  isDistancePriceValid = true;
  priceTypes = new Set<string>();


  constructor(private roadCardEntryRepositoryService: RoadCardEntryRepositoryService,
              private router: Router,
              private route: ActivatedRoute,
              private roadCardEntryService: RoadCardEntryService,
              private costCodeRepositoryService: CostCodeRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              private distancePriceRepositoryService: DistancePriceRepositoryService,
              // private materialRepoitoryService: MaterialRepositoryService,
              private operatorRepositoryService: OperatorRepositoryService) {
  }

  ngOnInit(): void {

    const workDocumentId = history.state.workDocument.id;

    if (this.isOnEdit) {

      const roadCardEntry = history.state.roadCardEntry;

      this.roadCardEntryForm = new FormGroup({
        workCode: new FormControl(roadCardEntry.workCode, Validators.required),
        startHour: new FormControl(roadCardEntry.startHour, Validators.required),
        endHour: new FormControl(roadCardEntry.endHour, Validators.required),
        loadingPlace: new FormControl(roadCardEntry.loadingPlace, Validators.required),
        // editedMaterial: new FormControl({value: roadCardEntry.material.type, disabled: true}),
        material: new FormControl(roadCardEntry.material, Validators.required),
        unloadingPlace: new FormControl(roadCardEntry.unloadingPlace, Validators.required),
        quantity: new FormControl(roadCardEntry.quantity, [Validators.required, Validators.min(0)]),
        measureUnit: new FormControl(roadCardEntry.measureUnit, Validators.required),
        runsNumber: new FormControl(roadCardEntry.runsNumber, Validators.required),
        priceType: new FormControl(roadCardEntry.distancePrice.priceType, Validators.required),
        distance: new FormControl(roadCardEntry.distance, [Validators.required, Validators.min(0)]),
        distancePrice: new FormControl({value: roadCardEntry.distancePrice.price, disabled: true}, Validators.required),
        editedEstimatePosition: new FormControl(
          {value: roadCardEntry.estimatePosition.name + ';' +  roadCardEntry.estimatePosition.costCode.fullCode, disabled: true}
          ),
        estimatePosition: new FormControl(roadCardEntry.estimatePosition, Validators.required),
        projectCode: new FormControl(roadCardEntry.costCode.projectCode, Validators.required),
        costType: new FormControl(roadCardEntry.costCode.costType, Validators.required),
        acceptingPerson: new FormControl(roadCardEntry.acceptingPerson, Validators.required),
        workDocument: new FormControl({value: workDocumentId, disabled: true}, Validators.required),
      });

      this.distancePrice = roadCardEntry.distancePrice;
      this.costTypes.push(roadCardEntry.costCode.costType);
    } else {
      this.roadCardEntryForm = new FormGroup({
        workCode: new FormControl('', Validators.required),
        startHour: new FormControl('', Validators.required),
        endHour: new FormControl('', Validators.required),
        loadingPlace: new FormControl('', Validators.required),
        // editedMaterial: new FormControl({value: null, disabled: true}),
        material: new FormControl('-', Validators.required),
        unloadingPlace: new FormControl('', Validators.required),
        quantity: new FormControl(0, [Validators.required, Validators.min(0)]),
        measureUnit: new FormControl('-', Validators.required),
        runsNumber: new FormControl(0, Validators.required),
        priceType: new FormControl('', Validators.required),
        distance: new FormControl('', [Validators.required, Validators.min(0)]),
        distancePrice: new FormControl({value: '', disabled: true}, Validators.required),
        editedEstimatePosition: new FormControl({value: null, disabled: true}),
        estimatePosition: new FormControl('', Validators.required),
        projectCode: new FormControl('', Validators.required),
        costType: new FormControl('', Validators.required),
        acceptingPerson: new FormControl('', Validators.required),
        workDocument: new FormControl({value: workDocumentId, disabled: true}, Validators.required)
      });
    }

    const params = new HttpParams({});

    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });

    this.estimatePositionRepositoryService.getEstimatePositions(params).subscribe(response => {
      this.estimatePositions.next(Object.values(response)[0]);
    });

    // this.materialRepoitoryService.getMaterials(params).subscribe(response => {
    //   this.materials.next(Object.values(response)[0]);
    // });

    this.operatorRepositoryService.getOperators(params).subscribe(response => {
      this.acceptingPersons.next(Object.values(response)[0]);
    });

    const workDocument: WorkDocument = history.state.workDocument;
    const matchingPricesParams = new HttpParams({
      fromObject: {
        machineNumber: workDocument.machine.internalId,
        date: workDocument.date.toString()
      }
    });

    this.distancePriceRepositoryService.getMatchingPrices(matchingPricesParams).subscribe(response => {
      this.distancePrices.next(Object.values(response));

      const prices = this.distancePrices.getValue();
      for (const price of prices) {
        this.priceTypes.add(price.priceType);
      }
    });
  }

  onAddEntry() {

    const workDocument = history.state.workDocument;

    const fullCode = this.roadCardEntryForm.value.projectCode + '-' + this.roadCardEntryForm.value.costType;

    const estimatePosition = this.roadCardEntryForm.value.estimatePosition;

    let newCostCode = {} as CostCode;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode + '-' + costCode.costType === fullCode) {
        newCostCode = costCode;
        break;
      }
    }

    const roadCardEntry = new RoadCardEntry(
      this.roadCardEntryForm.value.workCode,
      this.roadCardEntryForm.value.startHour,
      this.roadCardEntryForm.value.endHour,
      this.roadCardEntryForm.value.loadingPlace,
      this.roadCardEntryForm.value.material,
      this.roadCardEntryForm.value.unloadingPlace,
      this.roadCardEntryForm.value.quantity,
      this.roadCardEntryForm.value.measureUnit,
      this.roadCardEntryForm.value.runsNumber,
      this.roadCardEntryForm.value.distance,
      this.distancePrice,
      estimatePosition,
      newCostCode,
      this.roadCardEntryForm.value.acceptingPerson,
      workDocument,
    );

    let isDocumentEntryOnEdit = false;

    if (this.isOnEdit) {
      const index = history.state.index;
      roadCardEntry.id = this.roadCardEntryService.getRoadCardEntry(index).id;
      this.roadCardEntryService.updateRoadCardEntry(index, roadCardEntry);
      isDocumentEntryOnEdit = true;
    } else {
      this.roadCardEntryService.addRoadCardEntry(roadCardEntry);
    }
    // let changedEntries = this.workReportEntries.slice();
    // this.workReportEntries.push(workReportEntry);
    const isSaveEntriesButtonVisible = true;
    const isAddNewWorkDocumentEntryButtonVisible = true;
    const areEntriesVisible = true;
    this.router.navigateByUrl('work-document-add', {state: {
      roadCardEntry, isDocumentEntryOnEdit, isSaveEntriesButtonVisible, isAddNewWorkDocumentEntryButtonVisible, areEntriesVisible}});
  }

  onBack() {
    const workDocument = history.state.workDocument;

    const shouldGetDataFromDb = false;
    const areEntriesVisible = true;
    const isAddNewWorkDocumentEntryButtonVisible = true;
    const isDocumentEntryOnEdit = false;
    const isSaveEntriesButtonVisible = true;

    this.router.navigateByUrl('work-document-add', {
      state: {
        shouldGetDataFromDb, workDocument, areEntriesVisible, isAddNewWorkDocumentEntryButtonVisible,
        isDocumentEntryOnEdit, isSaveEntriesButtonVisible
      }
    });
  }

  onSelectProjectCode(projectCode: any) {
    this.costTypes.length = 0;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode === projectCode) {
        this.costTypes.push(costCode.costType);
      }
    }
  }

  enableEstimatePositionSelect() {
    this.isEstimatePositionShown = true;
  }

  onSelectEstimatePosition(estimatePosition: any) {

    if (this.isOnEdit) {
      this.roadCardEntryForm.patchValue({
        editedEstimatePosition: estimatePosition.name
      });

      this.isEstimatePositionShown = false;
    }

    if (estimatePosition.measureUnit !== RoadCardEntryAddComponent.HOUR_UNIT) {
      this.roadCardEntryForm.patchValue({
        projectCode: estimatePosition.costCode.projectCode,
        costType: estimatePosition.costCode.costType
      });
    } else {
      this.roadCardEntryForm.patchValue({
        projectCode: '',
        costType: ''
      });
    }

    this.getDistancePrice();
  }

  styleElementToChange() {

    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

  onWorkCodeChange() {

    this.getDistancePrice();
  }

  onDistanceChange() {
    this.getDistancePrice();
  }

  getDistancePrice() {

    const workCode = this.roadCardEntryForm.value.workCode;
    const distance = this.roadCardEntryForm.value.distance;
    const priceType = this.roadCardEntryForm.value.priceType;
    const projectCode = this.roadCardEntryForm.value.estimatePosition.costCode.projectCode;


    this.roadCardEntryForm.patchValue({
      distancePrice: ''
    });

    this.isDistancePriceValid = false;

    const distancePrices = this.distancePrices.getValue();
    for (const price of distancePrices) {
      if (workCode === price.workCode
        && distance !== '' && distance >= price.rangeMin && distance <= price.rangeMax
        && priceType === price.priceType
        && projectCode === price.projectCode) {
        this.distancePrice = price;
        this.roadCardEntryForm.patchValue({
          distancePrice: price.price
        });

        this.isDistancePriceValid = true;
      }
    }
  }

  enableMaterialSelect() {
    this.isMaterialShown = true;
  }

  onSelectMaterial(material: any) {
    if (this.isOnEdit) {
      this.roadCardEntryForm.patchValue({
        editedMaterial: material.type
      });

      this.isMaterialShown = false;
    }
  }

  onPriceTypeChange() {
    this.getDistancePrice();
  }

  compareIds(a, b) {
    return a.id === b.id;
  }
}
