import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {MessageStyler} from '../../utils/message-styler';
import {DailyReport} from '../model/daily-report.model';
import {DailyReportRepositoryService} from '../repository-service/daily-report-repository.service';
import {HttpParams} from '@angular/common/http';
import {EstimatePositionRepositoryService} from '../../estimate/repository-service/estimate-position-repository.service';

@Component({
  selector: 'app-daily-report-add',
  templateUrl: './daily-report-add.component.html',
  styleUrls: ['./daily-report-add.component.css']
})
export class DailyReportAddComponent implements OnInit {
  dailyReportAddForm: FormGroup;
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);
  isOnEdit = history.state.dailyReport !== undefined;
  userMessages: any[] = [];
  messageStyler = MessageStyler;

  constructor(private dailyReportRepositoryService: DailyReportRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService) {}

  ngOnInit(): void {

    if (this.isOnEdit) {

      const dailyReport = history.state.dailyReport;

      this.dailyReportAddForm = new FormGroup({
        date: new FormControl(dailyReport.date, Validators.required),
        estimatePosition: new FormControl(dailyReport.estimatePosition, Validators.required),
        estimateSellPrice: new FormControl({value: dailyReport.estimatePosition.sellPrice, disabled: true}, Validators.required),
        estimateRemarks: new FormControl({value: dailyReport.estimatePosition.remarks, disabled: true}, Validators.required),
        location: new FormControl(dailyReport.location, Validators.required),
        startPoint: new FormControl(dailyReport.startPoint, Validators.required),
        endPoint: new FormControl(dailyReport.endPoint, Validators.required),
        side: new FormControl(dailyReport.side, Validators.required),
        quantity: new FormControl(dailyReport.quantity, Validators.required),
        measureUnit: new FormControl(dailyReport.measureUnit, Validators.required),
        remarks: new FormControl(dailyReport.remarks, Validators.required),
      });

    } else {

      this.dailyReportAddForm = new FormGroup({
        date: new FormControl('', Validators.required),
        estimatePosition: new FormControl('', Validators.required),
        estimateSellPrice: new FormControl({value: '', disabled: true}, Validators.required),
        estimateRemarks: new FormControl({value: '', disabled: true}, Validators.required),
        location: new FormControl('', Validators.required),
        startPoint: new FormControl('', Validators.required),
        endPoint: new FormControl('', Validators.required),
        side: new FormControl('-', Validators.required),
        quantity: new FormControl('', Validators.required),
        measureUnit: new FormControl('', Validators.required),
        remarks: new FormControl('', Validators.required),
      });
    }

    const params = new HttpParams({});

    this.estimatePositionRepositoryService.getEstimatePositions(params).subscribe(response => {
      this.estimatePositions.next(Object.values(response)[0]);
    });
  }

  onSubmit() {
    const dailyReport = new DailyReport(
      this.dailyReportAddForm.value.date,
      this.dailyReportAddForm.value.estimatePosition,
      this.dailyReportAddForm.value.location,
      this.dailyReportAddForm.value.startPoint,
      this.dailyReportAddForm.value.endPoint,
      this.dailyReportAddForm.value.side,
      this.dailyReportAddForm.value.quantity,
      this.dailyReportAddForm.value.measureUnit,
      this.dailyReportAddForm.value.remarks,
    );

    if (this.isOnEdit) {
      this.dailyReportRepositoryService.updateDailyReport(history.state.dailyReport.id, dailyReport).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Daily report { '
            + Object.values(data).splice(1, 1).toString() + ', '
            + Object.values(data).splice(2, 1)[0].name + ', '
            + Object.values(data).splice(2, 1)[0].costCode.fullCode + ', '
            + Object.values(data).splice(3)
            + ' } has been updated.');
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    } else {
      this.dailyReportRepositoryService.createDailyReport(dailyReport).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Daily report { '
            + Object.values(data).splice(1, 1).toString() + ', '
            + Object.values(data).splice(2, 1)[0].name + ', '
            + Object.values(data).splice(2, 1)[0].costCode.fullCode + ', '
            + Object.values(data).splice(3)
            + ' } has been created.');
          this.dailyReportAddForm.reset();
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    }
  }

  compareIds(a, b) {
    if (b === null) {
      return;
    }

    return a.id === b.id;
  }

  onSelectEstimatePosition() {
    const estimatePosition = this.dailyReportAddForm.value.estimatePosition;

    this.dailyReportAddForm.patchValue({
      estimateSellPrice: estimatePosition.sellPrice,
      estimateRemarks: estimatePosition.remarks
    });
  }
}
