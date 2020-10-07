import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SellerRepositoryService} from '../../seller/repository-service/seller-repository.service';
import {HttpParams} from '@angular/common/http';
import {MachineRepositoryService} from '../../machine/repository-service/machine-repository.service';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {Order} from '../model/order.model';
import {OrderRepositoryService} from '../repository-service/order-repository.service';
import {PriceTypeService} from '../../price/price-type.service';
import {MessageStyler} from '../../utils/message-styler';
import {PriceRepositoryService} from '../../price/rental/repository-service/price-repository.service';
import {Price} from '../../price/rental/model/price.model';
import {BehaviorSubject} from 'rxjs';
import {Machine} from '../../machine/model/machine.model';
import {Seller} from '../../seller/model/seller.model';
import {Client} from '../../client/model/client.model';

@Component({
  selector: 'app-ordedr-add',
  templateUrl: './order-add.component.html',
  styleUrls: ['./order-add.component.css']
})
export class OrderAddComponent implements OnInit {
  orderForm: FormGroup;
  machines = new BehaviorSubject<Machine[]>([]);
  sellers = new BehaviorSubject<Seller[]>([]);
  clients = new BehaviorSubject<Client[]>([]);
  isOnEdit = history.state.order !== undefined;
  order: Order = history.state.order;
  userMessages: any[] = [];
  priceTypes;
  messageStyler = MessageStyler;
  predefinedPrices: Price[] = [];
  isMachineShown = !this.isOnEdit;
  isClientShown = !this.isOnEdit;
  isSellerShown = !this.isOnEdit;


  constructor(private sellerRepositoryServce: SellerRepositoryService,
              private machineRepositoryService: MachineRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private orderRepositoryService: OrderRepositoryService,
              private priceRespositoryService: PriceRepositoryService) {
  }

  ngOnInit(): void {

    this.priceTypes = PriceTypeService.getAllPriceTypes();

    const queryParams = new HttpParams({});

    this.machineRepositoryService.getMachines(queryParams).subscribe(response => this.machines.next(Object.values(response)[0]));

    this.sellerRepositoryServce.getSellers(queryParams).subscribe(response => this.sellers.next(Object.values(response)[0]));

    this.clientRepositoryService.getClients(queryParams).subscribe(response => this.clients.next(Object.values(response)[0]));

    if (this.isOnEdit) {

        this.orderForm = new FormGroup(
          {
            status: new FormControl(this.order.status, Validators.required),
            startDate: new FormControl(this.order.startDate, Validators.required),
            endDate: new FormControl(this.order.endDate, Validators.required),
            editedMachine: new FormControl({value: this.order.machine.internalId, disabled: true}),
            machine: new FormControl(this.order.machine, Validators.required),
            priceType: new FormControl(this.order.priceType, Validators.required),
            priceValue: new FormControl(this.order.price, [Validators.required, Validators.min(0)]),
            quantity: new FormControl(this.order.quantity, [Validators.required, Validators.min(0)]),
            orderValue: new FormControl({value: this.order.value, disabled: true}),
            editedSeller: new FormControl({value: this.order.seller.mpk, disabled: true}),
            seller: new FormControl(this.order.seller, Validators.required),
            editedClient: new FormControl({value: this.order.client.mpk, disabled: true}),
            client: new FormControl(this.order.client, Validators.required)
          }
        );
    } else {
      this.orderForm = new FormGroup({
        status: new FormControl({value: 'Unsettled', disabled: false}),
        startDate: new FormControl('', Validators.required),
        endDate: new FormControl('', Validators.required),
        editedMachine: new FormControl({value: null, disabled: true}),
        machine: new FormControl(null, Validators.required),
        priceType: new FormControl('', Validators.required),
        priceValue: new FormControl('', [Validators.required, Validators.min(0)]),
        quantity: new FormControl('', [Validators.required, Validators.min(0)]),
        orderValue: new FormControl({value: null, disabled: true}),
        editedSeller: new FormControl({value: null, disabled: true}),
        seller: new FormControl('', Validators.required),
        editedClient: new FormControl({value: null, disabled: true}),
        client: new FormControl('', Validators.required)
      });
    }

  }

  onSelectStartDate() {
    this.clearAfterStartDateChange();
    this.clearAfterMachineChange();
  }

  onSelectMachine(machine: any) {

    if (this.isOnEdit) {
      this.orderForm.patchValue({
        editedMachine: machine.internalId
      });

      this.isMachineShown = false;
    }

    this.getPredefinedPricesForYearAndMachine();
    this.clearAfterMachineChange();
    this.updateOrderValue();
  }

  onSelectSeller(seller: any) {

    if (this.isOnEdit) {
      this.orderForm.patchValue({
        editedSeller: seller.mpk
      });

      this.isSellerShown = false;
    }
  }

  onSelectClient(client: any) {

    if (this.isOnEdit) {
      this.orderForm.patchValue({
        editedClient: client.mpk
      });

      this.isClientShown = false;
    }
  }

  getPredefinedPricesForYearAndMachine() {

    const startDate = new Date(this.orderForm.value.startDate);
    const fullYear = startDate.getFullYear();
    const machine = this.orderForm.value.machine;

    if (fullYear === undefined || machine === '' || machine === null) {
      return;
    }

    const machineNumber = this.orderForm.value.machine.internalId;

    const params = new HttpParams({
      fromObject: {
        year: fullYear.toString(),
        machineNumber,
        priceType: ''
      }
    });
    this.priceRespositoryService.getPrices(params).subscribe(response => {
      this.predefinedPrices = Object.values(response)[0];
    });
  }

  onPriceTypeChange(selectedPriceType: any) {

    let priceValue = null;

    if (this.predefinedPrices.length === 0) {
      return;
    }

    for (const price of this.predefinedPrices) {
      if (selectedPriceType === price.priceType) {
        priceValue = price.price;
      }
    }

    this.orderForm.patchValue({
      priceValue,
    });

    this.updateOrderValue();
  }

  onPriceValueChange() {
    this.updateOrderValue();
  }

  onQuantityChange() {
    this.updateOrderValue();
  }

  updateOrderValue() {

    const priceValue = this.orderForm.value.priceValue;
    const quantity = this.orderForm.value.quantity;

    this.orderForm.patchValue({
      orderValue: priceValue * quantity
    });
  }

  clearAfterMachineChange() {
    this.orderForm.patchValue({
      priceType: '',
      priceValue: null
    });
  }

  clearAfterStartDateChange() {
    this.orderForm.patchValue({
      machine: null
    });
  }

  onSubmit() {

    const newOrder = new Order(
      this.orderForm.value.status,
      this.orderForm.value.startDate,
      this.orderForm.value.endDate,
      this.orderForm.value.priceType,
      this.orderForm.value.quantity,
      this.orderForm.value.priceValue,
      this.orderForm.value.seller,
      this.orderForm.value.client,
      this.orderForm.value.machine,
    );

    if (this.isOnEdit) {
      this.orderRepositoryService.updateOrder(this.order.id, newOrder).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Order { ' + Object.values(data).splice(1, 8).toString() + ' } has been updated.');
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    } else {
      this.orderRepositoryService.createOrder(newOrder).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Order { ' + Object.values(data).splice(1, 8).toString() + ' } has been created.');
          this.orderForm.reset();
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
        }
      );
    }
  }


  enableMachineSelect() {
    this.isMachineShown = true;
  }

  enableClientSelect() {
    this.isClientShown = true;
  }

  enableSellerSelect() {
    this.isSellerShown = true;
  }

  styleElementToChange() {

    if (this.isOnEdit) {
      return {'background-color': 'blue', color: 'white'};
    }
  }
}
