import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MessageStyler} from '../../utils/message-styler';
import {WorkReportEntry} from '../model/work-report-entry.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WorkReportEntryRepositoryService} from '../repository-service/work-report-entry-repository.service';
import {WorkReportEntryService} from '../service/work-report-entry.service';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../../costcode/model/costcode.model';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {EstimatePositionRepositoryService} from '../../estimate/repository-service/estimate-position-repository.service';
import {WorkDocument} from '../../work-document/model/work-document.model';
import {HourPriceRepositoryService} from '../../price/hour/repository-service/hour-price-repository.service';
import {HourPrice} from '../../price/hour/model/hour-price.model';
import {Operator} from '../../operator/model/operator.model';
import {OperatorRepositoryService} from '../../operator/repository-service/operator-repository.service';
import {StartEndHourDialogComponent} from '../../work-document/hours-dialog/start-end-hour-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-work-report-entry-add',
  templateUrl: './work-report-entry-add.component.html',
  styleUrls: ['./work-report-entry-add.component.css']
})
export class WorkReportEntryAddComponent implements OnInit {

  static HOUR_UNIT = 'h';

  workReportEntryForm: FormGroup;
  isOnEdit = history.state.workDocument && history.state.workReportEntry;
  messageStyler = MessageStyler;
  workReportEntries: WorkReportEntry[] = [];
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  costTypes: string[] = [];
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);
  isEstimatePositionShown = !this.isOnEdit;
  hourPrices = new BehaviorSubject<HourPrice[]>([]);
  hourPrice;
  acceptingPersons = new BehaviorSubject<Operator[]>([]);
  isHourPriceValid = true;
  priceTypes = new Set<string>();

  constructor(private workReportEntryRepositoryService: WorkReportEntryRepositoryService,
              private router: Router,
              private route: ActivatedRoute,
              private workReportEntryService: WorkReportEntryService,
              private costCodeRepositoryService: CostCodeRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              private hourPriceRepositoryService: HourPriceRepositoryService,
              private operatorRepositoryService: OperatorRepositoryService,
              public dialog: MatDialog) {
  }


  ngOnInit(): void {

    const workDocumentId = history.state.workDocument.id;

    if (this.isOnEdit) {

      const workReportEntry = history.state.workReportEntry;

      this.workReportEntryForm = new FormGroup({
        workCode: new FormControl(workReportEntry.workCode, Validators.required),
        startHour: new FormControl(workReportEntry.startHour, Validators.required),
        endHour: new FormControl(workReportEntry.endHour, Validators.required),
        placeOfWork: new FormControl(workReportEntry.placeOfWork, Validators.required),
        typeOfWork: new FormControl(workReportEntry.typeOfWork, Validators.required),
        workQuantity: new FormControl(workReportEntry.workQuantity, [Validators.required, Validators.min(0)]),
        measureUnit: new FormControl(workReportEntry.measureUnit, Validators.required),
        priceType: new FormControl(workReportEntry.hourPrice.priceType, Validators.required),
        hourPrice: new FormControl({value: workReportEntry.hourPrice.price, disabled: true}, Validators.required),
        editedEstimatePosition: new FormControl(
          {value: workReportEntry.estimatePosition.name + ';' + workReportEntry.estimatePosition.costCode.fullCode, disabled: true}
          ),
        estimatePosition: new FormControl(workReportEntry.estimatePosition, Validators.required),
        projectCode: new FormControl(workReportEntry.costCode.projectCode, Validators.required),
        costType: new FormControl(workReportEntry.costCode.costType, Validators.required),
        acceptingPerson: new FormControl(workReportEntry.acceptingPerson, Validators.required),
        workDocument: new FormControl({value: workDocumentId, disabled: true}, Validators.required),
      });

      this.hourPrice = workReportEntry.hourPrice;
      this.costTypes.push(workReportEntry.costCode.costType);
    } else {
      this.workReportEntryForm = new FormGroup({
        workCode: new FormControl('', Validators.required),
        startHour: new FormControl('', Validators.required),
        endHour: new FormControl('', Validators.required),
        placeOfWork: new FormControl('-', Validators.required),
        typeOfWork: new FormControl('-', Validators.required),
        workQuantity: new FormControl(0, [Validators.required, Validators.min(0)]),
        measureUnit: new FormControl('-', Validators.required),
        priceType: new FormControl('', Validators.required),
        hourPrice: new FormControl({value: '', disabled: true}, Validators.required),
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

    this.hourPriceRepositoryService.getMatchingPrices(matchingPricesParams).subscribe(response => {
      this.hourPrices.next(Object.values(response));

      const prices = this.hourPrices.getValue();
      for (const price of prices) {
        this.priceTypes.add(price.priceType);
      }
    });

  }

  onAddEntry() {

    const workDocument = history.state.workDocument;

    const fullCode = this.workReportEntryForm.value.projectCode + '-' + this.workReportEntryForm.value.costType;

    const estimatePosition = this.workReportEntryForm.value.estimatePosition;

    let newCostCode = {} as CostCode;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode + '-' + costCode.costType === fullCode) {
        newCostCode = costCode;
        break;
      }
    }

    const workReportEntry = new WorkReportEntry(
      this.workReportEntryForm.value.workCode,
      this.workReportEntryForm.value.startHour,
      this.workReportEntryForm.value.endHour,
      this.workReportEntryForm.value.placeOfWork,
      this.workReportEntryForm.value.typeOfWork,
      this.workReportEntryForm.value.workQuantity,
      this.workReportEntryForm.value.measureUnit,
      this.hourPrice,
      estimatePosition,
      newCostCode,
      this.workReportEntryForm.value.acceptingPerson,
      workDocument
    );

    let isDocumentEntryOnEdit = false;

    if (this.isOnEdit) {
      const index = history.state.index;
      workReportEntry.id = this.workReportEntryService.getWorkReportEntry(index).id;
      this.workReportEntryService.updateWorkReportEntry(index, workReportEntry);
      isDocumentEntryOnEdit = true;
    } else {
      this.workReportEntryService.addWorkReportEntry(workReportEntry);
    }
    // let changedEntries = this.workReportEntries.slice();
    // this.workReportEntries.push(workReportEntry);
    const isSaveEntriesButtonVisible = true;
    const isAddNewWorkDocumentEntryButtonVisible = true;
    const areEntriesVisible = true;
    this.router.navigateByUrl('work-document-add', {
      state: {
        workReportEntry, isDocumentEntryOnEdit, isAddNewWorkDocumentEntryButtonVisible, isSaveEntriesButtonVisible, areEntriesVisible
      }
    });
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
      this.workReportEntryForm.patchValue({
        editedEstimatePosition: estimatePosition.name
      });

      this.isEstimatePositionShown = false;
    }

    if (estimatePosition.measureUnit !== WorkReportEntryAddComponent.HOUR_UNIT) {
      this.workReportEntryForm.patchValue({
        projectCode: estimatePosition.costCode.projectCode,
        costType: estimatePosition.costCode.costType
      });
    }

    // if (estimatePosition.measureUnit === WorkReportEntryAddComponent.HOUR_UNIT) {
    //   this.workReportEntryForm.patchValue({
    //     projectCode: estimatePosition.costCode.projectCode,
    //     costType: estimatePosition.costCode.costType
    //   });
    // } else {
    //   this.workReportEntryForm.patchValue({
    //     projectCode: '',
    //     costType: ''
    //   });
    // }
    this.getHourPrice();
  }

  getHourPrice() {

    const workCode = this.workReportEntryForm.value.workCode;
    const priceType = this.workReportEntryForm.value.priceType;
    const estimatePosition = this.workReportEntryForm.value.estimatePosition;
    const projectCode = estimatePosition === '' ? '' : estimatePosition.costCode.projectCode;

    this.workReportEntryForm.patchValue({
      hourPrice: ''
    });

    this.isHourPriceValid = false;

    const hourPrices = this.hourPrices.getValue();
    for (const price of hourPrices) {
      if (workCode === price.workCode && priceType === price.priceType && projectCode === price.projectCode) {
        this.hourPrice = price;
        this.workReportEntryForm.patchValue({
          hourPrice: price.price
        });

        this.isHourPriceValid = true;
      }
    }
  }

  styleElementToChange() {

    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }

  compareIds(a, b) {
    return a.id === b.id;
  }

  onHourChange() {
    const startHour = this.workReportEntryForm.value.startHour;
    const endHour = this.workReportEntryForm.value.endHour;

    if (startHour !== '' && endHour !== '' && endHour < startHour) {
      const dialogRef = this.dialog.open(StartEndHourDialogComponent, {
        restoreFocus: false,
        width: '350px',
        data: 'End hour is lower than start hour'
      });

      dialogRef.afterClosed().subscribe(() => document.getElementById('placeOfWork').focus());
    }
  }
}
