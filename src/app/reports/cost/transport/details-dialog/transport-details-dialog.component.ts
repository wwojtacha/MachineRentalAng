import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostReport} from '../../model/cost-report.model';

@Component({
  selector: 'app-transport-details-dialog',
  templateUrl: './transport-details-dialog.component.html',
  styleUrls: ['./transport-details-dialog.component.css']
})
export class TransportDetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<TransportDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public costReport: CostReport) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
