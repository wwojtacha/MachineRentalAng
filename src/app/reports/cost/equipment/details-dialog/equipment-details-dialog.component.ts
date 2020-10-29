import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CostReport} from '../../model/cost-report.model';

@Component({
  selector: 'app-equipment-details-dialog',
  templateUrl: './equipment-details-dialog.component.html',
  styleUrls: ['./equipment-details-dialog.component.css']
})
export class EquipmentDetailsDialogComponent {
  constructor(public dialogRef: MatDialogRef<EquipmentDetailsDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public costReport: CostReport) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
