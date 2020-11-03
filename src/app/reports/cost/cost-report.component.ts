import {Component, OnInit} from '@angular/core';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {CostCode} from '../../costcode/model/costcode.model';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CostReportRepositoryService} from './repository-service/cost-report-repository.service';
import {TotalEquipmentCost} from './equipment/total-equipment-cost.model';
import {CostReport} from './model/cost-report.model';
import {MatDialog} from '@angular/material';
import {EquipmentDetailsDialogComponent} from './equipment/details-dialog/equipment-details-dialog.component';
import {TransportDetailsDialogComponent} from './transport/details-dialog/transport-details-dialog.component';
import {DeliveryDetailsDialogComponent} from './delivery/delivery-dialog/delivery-details-dialog.component';

@Component({
  selector: 'app-cost-report',
  templateUrl: './cost-report.component.html',
  styleUrls: ['./cost-report.component.css']
})
export class CostReportComponent implements OnInit {

  costReportForm: FormGroup;
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  isValid = false;
  totalEquipmentCosts = new BehaviorSubject<TotalEquipmentCost[]>([]);
  costReports = new BehaviorSubject<CostReport[]>([]);
  coefficient = 0;

  grossSellValue = 0;
  grossTotalCost = 0;
  grossTotalCostWithOH = 0;
  grossResult = 0;


  constructor(private costCodeRepositoryService: CostCodeRepositoryService,
              private costReportRepositoryService: CostReportRepositoryService,
              public dialog: MatDialog) {}

  ngOnInit(): void {


    this.costReportForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      projectCode: new FormControl('', Validators.required),
      coefficient: new FormControl(0, Validators.required)
      }
    );


    const params = new HttpParams({});

    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });

  }


  onDateChange() {
    this.validateForm();
  }

  onProjectCodeChange() {
    this.validateForm();
  }

  validateForm() {

    const startDate: string = this.costReportForm.value.startDate;
    const endDate: string = this.costReportForm.value.endDate;

    const startDateYear = startDate.substring(0, 4);
    const startDateMonth = startDate.substring(5, 7);
    const startDateDay = startDate.substring(8, 11);
    const startDateAsNumber = + (startDateYear + startDateMonth + startDateDay);

    const endDateYear = endDate.substring(0, 4);
    const endDateMonth = endDate.substring(5, 7);
    const endDateDay = endDate.substring(8, 11);
    const endDateAsNumber = + (endDateYear + endDateMonth + endDateDay);

    this.isValid = false;

    const projetCode = this.costReportForm.value.projectCode;
    if (startDate !== '' && endDate !== '' && endDateAsNumber >= startDateAsNumber && projetCode !== '') {
      this.isValid = true;
    }
  }

  onSearch() {
    const params = new HttpParams({
      fromObject: {
        startDate: this.costReportForm.value.startDate,
        endDate: this.costReportForm.value.endDate,
        projectCode: this.costReportForm.value.projectCode
      }
    });



    this.costReportRepositoryService.getEquipmentCostReport(params).subscribe(response => {
      this.costReports.next(Object.values(response));

      this.calculateGrossTotals();
    });
  }

  calculateGrossTotals() {
    this.grossSellValue = 0;
    this.grossTotalCost = 0;
    this.grossTotalCostWithOH = 0;
    this.grossResult = 0;

    const costReports = this.costReports.getValue();
    for (const costReport of costReports) {

      const dailyReportQuantity = costReport.totalDailyReportQuantity;
      const sellPrice = costReport.estimatePosition.sellPrice;

      const equipmentCost = costReport.totalEquipmentCost.totalCostValue;
      const transportCost = costReport.totalTransportCost.totalCostValue;
      const deliveryCost = costReport.totalDeliveryCost.totalCostValue;
      const labourCost = costReport.totalLabourCost.totalCostValue;

      const totalSellValue = dailyReportQuantity * sellPrice;
      const totalCost = equipmentCost + transportCost + deliveryCost + labourCost;
      const totalCostWithOH = totalCost + ((this.coefficient / 100) * totalCost);
      const totalResult = totalSellValue - totalCostWithOH;

      this.grossSellValue += totalSellValue;
      this.grossTotalCost += totalCost;
      this.grossTotalCostWithOH += totalCostWithOH;
      this.grossResult += totalResult;
    }
  }


  showEquipmentDetails(costReport: CostReport) {

    this.dialog.open(EquipmentDetailsDialogComponent, {
      width: '80vh',
      data: costReport
    });
  }

  showTransportDetails(costReport: CostReport) {

    this.dialog.open(TransportDetailsDialogComponent, {
      width: '80vh',
      data: costReport
    });
  }

  showDeliveryDetails(costReport: CostReport) {
    this.dialog.open(DeliveryDetailsDialogComponent, {
      width: '80vh',
      data: costReport
    });
  }

  onCoefficientChange() {
    this.coefficient = this.costReportForm.value.coefficient;

    this.calculateGrossTotals();
  }
}
