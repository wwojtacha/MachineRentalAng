import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-start-end-hour-dialog',
  templateUrl: './start-end-hour-dialog.component.html',
  styleUrls: ['./start-end-hour-dialog.component.css']
})
export class StartEndHourDialogComponent {
  constructor(public dialogRef: MatDialogRef<StartEndHourDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public message: string) {
  }

  onOkClick(): void {
    this.dialogRef.close();
  }
}
