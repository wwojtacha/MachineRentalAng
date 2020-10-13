import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {WorkReportEntry} from '../work-report-entry/model/work-report-entry.model';
import {ReportService} from './report.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportsForm: FormGroup;
  workReportEntries = new BehaviorSubject<WorkReportEntry[]>([]);
  isError = false;
  isValid = false;
  userMessage;

  constructor(private reportsService: ReportService) {}

  ngOnInit(): void {

    this.reportsForm = new FormGroup({
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required)
    });
  }

  generateExcelWorkReportEntryReport() {

    const startDate = this.reportsForm.value.startDate;
    const endDate = this.reportsForm.value.endDate;

    const params = new HttpParams({
      fromObject: {
        startDate,
        endDate,
      }
    });

    this.reportsService.generateExcelWorkReportEntryReport(params).subscribe((response: any) => {

        this.isError = false;

        const url = window.URL.createObjectURL(response);
        // window.location.href = response.url;
        // window.open(url);

        const baseName = 'workReportEntries';

        const anchor = document.createElement('a');
        anchor.download = this.getFileName(baseName);
        anchor.href = url;
        anchor.click();
      },
      err => {
        this.isError = true;
        this.userMessage = Object.values(err.error)[0];
      });

  }

  generateExcelRoadCardEntryReport() {
    const params = this.getParams();

    this.reportsService.generateExcelRoadCardEntryReport(params).subscribe((response: any) => {

        this.isError = false;

        const url = window.URL.createObjectURL(response);
        // window.location.href = response.url;
        // window.open(url);

        const baseName = 'roadCardEntries';

        const anchor = document.createElement('a');
        anchor.download = this.getFileName(baseName);
        anchor.href = url;
        anchor.click();
      },
      err => {
        this.isError = true;
        this.userMessage = Object.values(err.error)[0];
      });
  }

  generateExcelDeliveryDocumentEntryReport() {
    const params = this.getParams();

    this.reportsService.generateExcelDeliveryDocumentEntryReport(params).subscribe((response: any) => {

        this.isError = false;

        const url = window.URL.createObjectURL(response);
        // window.location.href = response.url;
        // window.open(url);

        const baseName = 'deliveryDocumentEntries';

        const anchor = document.createElement('a');
        anchor.download = this.getFileName(baseName);
        anchor.href = url;
        anchor.click();
      },
      err => {
        this.isError = true;
        this.userMessage = Object.values(err.error)[0];
      });
  }

  getParams() {
    const startDate = this.reportsForm.value.startDate;
    const endDate = this.reportsForm.value.endDate;

    const params = new HttpParams({
      fromObject: {
        startDate,
        endDate,
      }
    });

    return params;
  }

  getFileName(baseName: string) {
    const date = new Date();
    const fullYear = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return baseName + '_' + fullYear + '-' + month + '-' + day + ';' + hours + '-' + minutes + '-' + seconds + '.xlsx';
  }

  onDateChange() {
    const startDate: string = this.reportsForm.value.startDate;
    const endDate: string = this.reportsForm.value.endDate;

    const startDateYear = startDate.substring(0, 4);
    const startDateMonth = startDate.substring(5, 7);
    const startDateDay = startDate.substring(8, 11);
    const startDateAsNumber = + (startDateYear + startDateMonth + startDateDay);

    const endDateYear = endDate.substring(0, 4);
    const endDateMonth = endDate.substring(5, 7);
    const endDateDay = endDate.substring(8, 11);
    const endDateAsNumber = + (endDateYear + endDateMonth + endDateDay);

    this.isValid = false;

    if (startDate !== '' && endDate !== '' && endDateAsNumber >= startDateAsNumber) {
      this.isValid = true;
    }
  }
}
