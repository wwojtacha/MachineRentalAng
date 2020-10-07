import {Component, OnInit} from '@angular/core';
import {OrderRepositoryService} from '../repository-service/order-repository.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {SellerRepositoryService} from '../../seller/repository-service/seller-repository.service';
import {PriceTypeService} from '../../price/price-type.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {ConfirmationDialogComponent} from '../../confirmation-dialog/confirmation-dialog.component';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {Order} from '../model/order.model';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../../client/model/client.model';
import {Seller} from '../../seller/model/seller.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  orders = new BehaviorSubject<Order[]>([]);
  orderListForm: FormGroup;
  clients = new BehaviorSubject<Client[]>([]);
  sellers = new BehaviorSubject<Seller[]>([]);
  priceTypes;

  constructor(private orderRepositoryService: OrderRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private sellerRepositoryService: SellerRepositoryService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.orderListForm = new FormGroup({
      machineNumber: new FormControl(''),
      status: new FormControl(''),
      startDateStart: new FormControl(''),
      startDateEnd: new FormControl(''),
      endDateStart: new FormControl(''),
      endDateEnd: new FormControl(''),
      priceType: new FormControl(''),
      clientName: new FormControl(''),
      sellerName: new FormControl('')
    });

    this.priceTypes = PriceTypeService.getAllPriceTypes();

    const params = new HttpParams({});

    this.clientRepositoryService.getClients(params).subscribe(response => this.clients.next(Object.values(response)[0]));

    this.sellerRepositoryService.getSellers(params).subscribe(response => this.sellers.next(Object.values(response)[0]));

  }

  onEditOrder(order: Order) {
    this.router.navigateByUrl('order-add/', {state : {order}});
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        machineInternalId: this.orderListForm.value.machineNumber,
        status: this.orderListForm.value.status,
        orderStartDateStart: this.orderListForm.value.startDateStart,
        orderStartDateEnd: this.orderListForm.value.startDateEnd,
        orderEndDateStart: this.orderListForm.value.endDateStart,
        orderEndDateEnd: this.orderListForm.value.endDateEnd,
        priceType: this.orderListForm.value.priceType,
        clientName: this.orderListForm.value.clientName,
        sellerName: this.orderListForm.value.sellerName,
      }
    });

    this.orderRepositoryService.getOrders(params).subscribe(response => {
      this.orders.next(Object.values(response)[0]);
    });
  }

  onDeleteOrder(id: any, index) {

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete ?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderRepositoryService.deleteOrder(id).subscribe(
          data => {
            this.orders.getValue().splice(index, 1);
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
