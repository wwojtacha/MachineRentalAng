import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {DailyReport} from '../model/daily-report.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {EstimatePositionRepositoryService} from '../../estimate/repository-service/estimate-position-repository.service';
import {HttpParams} from '@angular/common/http';
import {DailyReportRepositoryService} from '../repository-service/daily-report-repository.service';
import {Router} from '@angular/router';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-daily-report-list',
  templateUrl: './daily-report-list.component.html',
  styleUrls: ['./daily-report-list.component.css']
})
export class DailyReportListComponent implements OnInit {
  dailyReportListForm: FormGroup;
  dailyReports = new BehaviorSubject<DailyReport[]>([]);
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);

  constructor(private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              private dailyReportRepositoryService: DailyReportRepositoryService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {

    this.dailyReportListForm = new FormGroup({
      date: new FormControl(''),
      estimatePosition: new FormControl(''),
      location: new FormControl('')
    });

    const params = new HttpParams({});

    this.estimatePositionRepositoryService.getEstimatePositions(params).subscribe(response => {
      this.estimatePositions.next(Object.values(response)[0]);
    });

  }

  onSearch() {

    const estimatePosition = this.dailyReportListForm.value.estimatePosition;
    let params = new HttpParams({});

    if (estimatePosition !== undefined && estimatePosition !== '') {
      params = new HttpParams({
        fromObject: {
          date: this.dailyReportListForm.value.date,
          estimatePositionName: estimatePosition.name,
          estimatePositionCostCode: estimatePosition.costCode.fullCode,
          location: this.dailyReportListForm.value.location
        }
      });
    }

    this.dailyReportRepositoryService.getDailyReports(params).subscribe(response => {
      this.dailyReports.next(Object.values(response)[0]);
    });
  }

  onEditDailyReport(dailyReport: any) {
    this.router.navigateByUrl('daily-report-add/', {state: {dailyReport}});
  }

  onDeleteDailyReport(id: any, index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dailyReportRepositoryService.deleteDailyReport(id).subscribe(
          data => {
            this.dailyReports.getValue().splice(index, 1);
          },
          err => {
            let userMessage;
            const entries = Object.entries(err.error);
            for (const entry of entries) {
              if (entry[0] === 'message') {
                userMessage = entry[1];
              }
            }

            this.dialog.open(ErrorDialogComponent, {
              width: '450px',
              data: userMessage
            });
          }
        );
      }
    });
  }
}
