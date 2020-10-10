import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MessageStyler} from '../../../utils/message-styler';
import {DeliveryPrice} from '../model/delivery-price.model';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../../../client/model/client.model';
import {Material} from '../../../material/model/material.model';
import {CostCodeRepositoryService} from '../../../costcode/repository-service/cost-code-repository.service';
import {HttpParams} from '@angular/common/http';
import {ClientRepositoryService} from '../../../client/repository-service/client-repository.service';
import {MaterialRepositoryService} from '../../../material/repository-service/material-repository.service';
import {DeliveryPriceRepositoryService} from '../repository-service/delivery-price-repository.service';
import {CostCode} from '../../../costcode/model/costcode.model';
import {MatDialog} from "@angular/material";
import {ConfirmationDialogComponent} from "../../../confirmation-dialog/confirmation-dialog.component";
import {ErrorDialogComponent} from "../../../error-dialog/error-dialog.component";

@Component({
  selector: 'app-delivery-price-list',
  templateUrl: './delivery-price-list.component.html',
  styleUrls: ['./delivery-price-list.component.css']
})
export class DeliveryPriceListComponent implements OnInit {
  deliveryPriceListForm: FormGroup;
  messageStyler = MessageStyler;
  // isError = false;
  userMessage;
  prices = new BehaviorSubject<DeliveryPrice[]>([]);
  contractors = new BehaviorSubject<Client[]>([]);
  materials = new BehaviorSubject<Material[]>([]);
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();

  constructor(private router: Router,
              private costCodeRepositoryService: CostCodeRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private materialRepositoryService: MaterialRepositoryService,
              private deliveryPriceRepositoryService: DeliveryPriceRepositoryService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    const params = new HttpParams({});
    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
        this.projectCodes.add('NOT DEFINED');
      }
    });

    this.clientRepositoryService.getClients(params).subscribe(response => {
      this.contractors.next(Object.values(response)[0]);
    });

    this.materialRepositoryService.getMaterials(params).subscribe(response => {
      this.materials.next(Object.values(response)[0]);
    });

    this.deliveryPriceListForm = new FormGroup({
      contractor: new FormControl(''),
      material: new FormControl(''),
      priceType: new FormControl(''),
      projectCode: new FormControl('')
    });
  }

  onSearch() {
    const params = new HttpParams({
      fromObject: {
        contractor: this.deliveryPriceListForm.value.contractor,
        material: this.deliveryPriceListForm.value.material,
        priceType: this.deliveryPriceListForm.value.priceType,
        projectCode: this.deliveryPriceListForm.value.projectCode,
      }
    });

    this.deliveryPriceRepositoryService.getPrices(params).subscribe(response => {
      this.prices.next(Object.values(response)[0]);
    });
  }

  onEditPrice(price: DeliveryPrice) {
    this.router.navigateByUrl('delivery-price-edit/', {state: {price}});
  }

  // onDeletePrice(id: number, index: number) {
  //   this.deliveryPriceRepositoryService.deletePrice(id).subscribe(
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
        this.deliveryPriceRepositoryService.deletePrice(id).subscribe(
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

