import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageStyler} from '../../../utils/message-styler';
import {BehaviorSubject} from 'rxjs';
import {DistancePrice} from '../model/distance-price.model';
import {DistancePriceRepositoryService} from '../repository-service/distance-price-repository.service';
import {ConfirmationDialogComponent} from '../../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';
@Component({
  selector: 'app-distance-price-list',
  templateUrl: './distance-price-list.component.html',
  styleUrls: ['./distance-price-list.component.css']
})
export class DistancePriceListComponent implements OnInit {
  prices = new BehaviorSubject<DistancePrice[]>([]);
  distancePriceListForm: FormGroup;
  userMessage;
  // isError = false;
  messageStyler = MessageStyler;

  constructor(private distancePriceRepositoryService: DistancePriceRepositoryService,
              private router: Router,
              public dialog: MatDialog) {}

  ngOnInit(): void {

    this.distancePriceListForm = new FormGroup({
      workCode: new FormControl(''),
      machineNumber: new FormControl(''),
      priceType: new FormControl('')
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        workCode: this.distancePriceListForm.value.workCode,
        machineNumber: this.distancePriceListForm.value.machineNumber,
        priceType: this.distancePriceListForm.value.priceType
      }
    });

    this.distancePriceRepositoryService.getPrices(params).subscribe(response => {
      this.prices.next(Object.values(response)[0]);
    });
  }

  onEditPrice(price: DistancePrice) {
    this.router.navigateByUrl('distance-price-edit/', {state : {price}});
  }

  // onDeletePrice(id: number, index: number) {
  //   this.distancePriceRepositoryService.deletePrice(id).subscribe(
  //     data => {
  //       this.userMessage = 'Price with id: '  + id + ' has been deleted.';
  //       this.prices.getValue().splice(index, 1);
  //     },
  //     err => {
  //       this.isError = true;
  //       const entries = Object.entries(err.error);
  //       for (const entry of entries) {
  //         if (entry[0] === 'message') {
  //           this.userMessage = entry[1];
  //         }
  //       }
  //     }
  //   );
  // }

  onDeletePrice(id: number, index: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.distancePriceRepositoryService.deletePrice(id).subscribe(
          data => {
            this.prices.getValue().splice(index, 1);
          },
          err => {
            let userMessage;
            const entries = Object.entries(err.error);
            for (const entry of entries) {
              if (entry[0] === 'message') {
                userMessage = entry[1];
              }
            }

            // this.userMessage = Object.keys(err.error).find(k => err.error[k].index === 'message');

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
