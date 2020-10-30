import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostReport} from '../../model/cost-report.model';

@Component({
  selector: 'app-delivery-details-dialog',
  templateUrl: './delivery-details-dialog.component.html',
  styleUrls: ['./delivery-details-dialog.component.css']
})
export class DeliveryDetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeliveryDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public costReport: CostReport) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
