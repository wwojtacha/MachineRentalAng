import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {WorkReportEntry} from '../work-report-entry/model/work-report-entry.model';
import {WorkReportReportService} from './work-report-report.service';

@Component({
  selector: 'app-work-report-report',
  templateUrl: './work-report-report.component.html',
  styleUrls: ['./work-report-report.component.css']
})
export class WorkReportReportComponent implements OnInit {
  reportsForm: FormGroup;
  workReportEntries = new BehaviorSubject<WorkReportEntry[]>([]);

  constructor(private reportsService: WorkReportReportService) {}

  ngOnInit(): void {

    this.reportsForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }

  generateReport() {

    const startDate = this.reportsForm.value.startDate;
    const endDate = this.reportsForm.value.endDate;

    const params = new HttpParams({
      fromObject: {
        startDate,
        endDate,
      }
    });

    this.reportsService.generateReport(params).subscribe(response => {
      this.workReportEntries.next(Object.values(response));
    });

    // this.reportsService.generateReport(params).subscribe((response: any) => {
    //   this.workReportEntries.next(Object.values(response));
    //   const contentType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    //   const blob = new Blob([response.arrayBuffer()], { type: contentType});
    //   const url = window.URL.createObjectURL(blob);
    //   window.open(url);
    // });


  }
}
