import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../../client/model/client.model';
import {Material} from '../../material/model/material.model';
import {EstimatePosition} from '../../estimate/model/estimate.position';
import {DeliveryPrice} from '../../price/delivery/model/delivery-price.model';
import {CostCode} from '../../costcode/model/costcode.model';
import {HttpParams} from '@angular/common/http';
import {CostCodeRepositoryService} from '../../costcode/repository-service/cost-code-repository.service';
import {EstimatePositionRepositoryService} from '../../estimate/repository-service/estimate-position-repository.service';
import {ClientRepositoryService} from '../../client/repository-service/client-repository.service';
import {MaterialRepositoryService} from '../../material/repository-service/material-repository.service';
import {DeliveryPriceRepositoryService} from '../../price/delivery/repository-service/delivery-price-repository.service';
import {DeliveryDocumentEntry} from '../model/delivery-document-entry.model';
import {DeliveryDocumentEntryRepositoryService} from '../repository-service/delivery-document-entry-repository.service';
import {MessageStyler} from '../../utils/message-styler';
import {DeliveryDocumentEntryService} from '../service/delivery-document-entry.service';
import {Router} from '@angular/router';
import {DeliveryDocumentRepositoryService} from '../../delivery-document/repository-service/delivery-document-repository.service';

@Component({
  selector: 'app-delivery-document-entry-add',
  templateUrl: './delivery-document-entry-add.component.html',
  styleUrls: ['./delivery-document-entry-add.component.css']
})
export class DeliveryDocumentEntryAddComponent implements OnInit {
  deliveryDocumentEntryAddForm: FormGroup;
  contractorNames = [];
  contractors = new BehaviorSubject<Client[]>([]);
  materialTypes = [];
  materials = new BehaviorSubject<Material[]>([]);
  estimatePositionNames = [];
  estimatePositions = new BehaviorSubject<EstimatePosition[]>([]);
  deliveryPrices = new BehaviorSubject<DeliveryPrice[]>([]);
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  costTypes: string[] = [];
  isOnEdit = history.state.deliveryDocumentEntry;
  selectedContractor: Client;
  selectedMaterial: Material;
  selectedEstimatePosition: EstimatePosition;
  isDeliveryPriceValid = false;
  deliveryPrice: DeliveryPrice;
  userMessages: any[] = [];
  messageStyler = MessageStyler;
  deliveryDocument;
  id;
  date;


  constructor(private costCodeRepositoryService: CostCodeRepositoryService,
              private estimatePositionRepositoryService: EstimatePositionRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private materialRepositoryService: MaterialRepositoryService,
              private deliveryPriceRepositoryService: DeliveryPriceRepositoryService,
              private deliveryDocumentEntryRepositoryService: DeliveryDocumentEntryRepositoryService,
              private deliveryDocumentEntryService: DeliveryDocumentEntryService,
              private deliveryDocumentRepositoryService: DeliveryDocumentRepositoryService,
              private router: Router) {}


  ngOnInit(): void {

    if (this.isOnEdit) {
      this.deliveryDocument = history.state.deliveryDocumentEntry.deliveryDocument;
      this.id = history.state.deliveryDocumentEntry.id;
    } else {
        this.deliveryDocument = history.state.deliveryDocument;
    }

    if (this.isOnEdit) {
      const deliveryDocumentEntry = history.state.deliveryDocumentEntry;

      this.deliveryDocumentEntryAddForm = new FormGroup({
        contractorName: new FormControl(deliveryDocumentEntry.contractor.name, Validators.required),
        materialType: new FormControl(deliveryDocumentEntry.material.type, Validators.required),
        quantity: new FormControl(deliveryDocumentEntry.quantity, Validators.required),
        measureUnit: new FormControl(deliveryDocumentEntry.measureUnit, Validators.required),
        estimatePositionName: new FormControl(deliveryDocumentEntry.estimatePosition.name + ';' + deliveryDocumentEntry.estimatePosition.costCode.fullCode, Validators.required),
        projectCode: new FormControl(deliveryDocumentEntry.costCode.projectCode, Validators.required),
        costType: new FormControl(deliveryDocumentEntry.costCode.costType, Validators.required),
        priceType: new FormControl(deliveryDocumentEntry.deliveryPrice.priceType, Validators.required),
        deliveryPrice: new FormControl({value: deliveryDocumentEntry.deliveryPrice.price, disabled: true}, Validators.required),
        costValue: new FormControl({value: deliveryDocumentEntry.costValue, disabled: true}, Validators.required),
        invoiceNumber: new FormControl(deliveryDocumentEntry.invoiceNumber, Validators.required),
        deliveryDocument: new FormControl({value: this.deliveryDocument.documentNumber, disabled: true}, Validators.required)
      });

      this.isDeliveryPriceValid = true;
      this.costTypes.push(deliveryDocumentEntry.costCode.costType);
      this.selectedContractor = deliveryDocumentEntry.contractor;
      this.selectedMaterial = deliveryDocumentEntry.material;
      this.selectedEstimatePosition = deliveryDocumentEntry.estimatePosition;
      this.deliveryPrice = deliveryDocumentEntry.deliveryPrice;
      this.date = history.state.deliveryDocumentEntry.deliveryDocument.date;

      const params2 = new HttpParams({
        fromObject: {
          contractorMpk: this.selectedContractor.mpk,
          date: this.date
        }
      });
      this.deliveryPriceRepositoryService.getMatchingPrices(params2).subscribe(response => {
        this.deliveryPrices.next(Object.values(response));
        // this.getDeliveryPrice();
      });
    } else {
      this.deliveryDocumentEntryAddForm = new FormGroup({
        contractorName: new FormControl('', Validators.required),
        materialType: new FormControl('', Validators.required),
        quantity: new FormControl('', Validators.required),
        measureUnit: new FormControl('', Validators.required),
        estimatePositionName: new FormControl('', Validators.required),
        projectCode: new FormControl('', Validators.required),
        costType: new FormControl('', Validators.required),
        priceType: new FormControl('', Validators.required),
        deliveryPrice: new FormControl({value: '', disabled: true}, Validators.required),
        costValue: new FormControl({value: '', disabled: true}, Validators.required),
        invoiceNumber: new FormControl('NOT DEFINED', Validators.required),
        deliveryDocument: new FormControl({value: this.deliveryDocument.documentNumber, disabled: true}, Validators.required)
      });

      this.date = history.state.deliveryDocument.date;
    }

    const params = new HttpParams({});
    this.costCodeRepositoryService.getCostCodes(params).subscribe(response => {
      this.costCodes.next(Object.values(response)[0]);

      const costCodes = this.costCodes.getValue();
      for (const costCode of costCodes) {
        this.projectCodes.add(costCode.projectCode);
      }
    });

    this.estimatePositionRepositoryService.getEstimatePositions(params).subscribe(response => {
      this.estimatePositions.next(Object.values(response)[0]);

      const estimatePositions = this.estimatePositions.getValue();
      for (const estimatePosition of estimatePositions) {
        this.estimatePositionNames.push(estimatePosition.name + ';' + estimatePosition.costCode.fullCode);
      }
    });

    this.clientRepositoryService.getClients(params).subscribe(response => {
      this.contractors.next(Object.values(response)[0]);

      const contractors = this.contractors.getValue();
      for (const contractor of contractors) {
        this.contractorNames.push(contractor.name);
      }
    });

    this.materialRepositoryService.getMaterials(params).subscribe(response => {
      this.materials.next(Object.values(response)[0]);

      const materials = this.materials.getValue();
      for (const material of materials) {
        this.materialTypes.push(material.type);
      }
    });
  }

  chooseContractor(selectedContractorName: {}) {
    for (const contractor of this.contractors.getValue()) {
      if (contractor.name === selectedContractorName) {
        this.selectedContractor = contractor;
        break;
      }
    }

    const params = new HttpParams({
      fromObject: {
        contractorMpk: this.selectedContractor.mpk,
        date: this.date
      }
    });
    this.deliveryPriceRepositoryService.getMatchingPrices(params).subscribe(response => {
      this.deliveryPrices.next(Object.values(response));
      this.getDeliveryPrice();
    });
  }

  chooseMaterial(selectedMaterialType: {}) {
    for (const material of this.materials.getValue()) {
      if (material.type === selectedMaterialType) {
        this.selectedMaterial = material;
        break;
      }
    }

    this.getDeliveryPrice();
  }

  chooseEstimatePosition(selectedEstimatePositionName: {}) {
    for (const estimatePosition of this.estimatePositions.getValue()) {
      if (estimatePosition.name + ';' + estimatePosition.costCode.fullCode === selectedEstimatePositionName) {
        this.selectedEstimatePosition = estimatePosition;
        break;
      }
    }

    this.getDeliveryPrice();
  }

  onSelectProjectCode(projectCode: {}) {
    this.costTypes.length = 0;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode === projectCode) {
        this.costTypes.push(costCode.costType);
      }
    }

    this.deliveryDocumentEntryAddForm.patchValue({
      costType: ''
    });
  }

  getDeliveryPrice() {
    const priceType = this.deliveryDocumentEntryAddForm.value.priceType;
    const materialType = this.deliveryDocumentEntryAddForm.value.materialType;
    const projectCode = this.selectedEstimatePosition.costCode.projectCode;

    this.deliveryDocumentEntryAddForm.patchValue({
      deliveryPrice: ''
    });

    this.isDeliveryPriceValid = false;

    const deliveryPrices = this.deliveryPrices.getValue();
    for (const price of deliveryPrices) {
      if (priceType === price.priceType && materialType === price.material.type && projectCode === price.projectCode) {
        this.deliveryPrice = price;
        this.deliveryDocumentEntryAddForm.patchValue({
          deliveryPrice: this.deliveryPrice.price
        });

        this.isDeliveryPriceValid = true;
        break;
      }
    }

    this.getCostValue();
  }

  getCostValue() {

    const price = this.deliveryPrice.price;
    const quantity = this.deliveryDocumentEntryAddForm.value.quantity;

    const value = price * quantity;

    if (!this.isDeliveryPriceValid || quantity === '') {
      this.deliveryDocumentEntryAddForm.patchValue({
        costValue: ''
      });
    } else {
      this.deliveryDocumentEntryAddForm.patchValue({
        costValue: value
      });
    }
  }

  onSubmit() {

    const deliveryDocument = this.deliveryDocument;

    const fullCode = this.deliveryDocumentEntryAddForm.value.projectCode + '-' + this.deliveryDocumentEntryAddForm.value.costType;
    let newCostCode = {} as CostCode;

    const costCodes = this.costCodes.getValue();
    for (const costCode of costCodes) {
      if (costCode.projectCode + '-' + costCode.costType === fullCode) {
        newCostCode = costCode;
        break;
      }
    }

    const deliveryDocumentEntry = new DeliveryDocumentEntry(
      this.selectedContractor,
      this.selectedMaterial,
      this.deliveryDocumentEntryAddForm.value.quantity,
      this.deliveryDocumentEntryAddForm.value.measureUnit,
      this.selectedEstimatePosition,
      newCostCode,
      this.deliveryPrice,
      this.deliveryDocumentEntryAddForm.value.quantity * this.deliveryPrice.price,
      this.deliveryDocumentEntryAddForm.value.invoiceNumber,
      deliveryDocument
    );

    if (this.isOnEdit) {
      this.deliveryDocumentEntryRepositoryService
      .updateDeliveryDocumentEntry(this.id, deliveryDocumentEntry).subscribe(
        data => {
        this.userMessages.length = 0;
        this.userMessages.push('Delivery document entry { ' + Object.values(data).splice(1, 2).toString() + ' } has been updated.');
        this.deliveryDocumentEntryService.updateDeliveryDocumentEntry(history.state.index, deliveryDocumentEntry);
        const areEntriesVisible = true;
        const isAddNewDeliveryEntryButtonVisible = true;
        this.router.navigateByUrl('delivery-document-add', {state: {deliveryDocument, areEntriesVisible, isAddNewDeliveryEntryButtonVisible}});
      },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
          history.state.areEntriesVisible = true;
        });
    } else {
      this.deliveryDocumentEntryRepositoryService.createDeliveryDocumentEntry(deliveryDocumentEntry).subscribe(
        data => {
          this.userMessages.length = 0;
          this.userMessages.push('Delivery document entry { ' + Object.values(data).splice(1, 2).toString() + ' } has been created.');
          // history.state.isOnAddNewWorkDocument = false;
          // history.state.deliveryDocument = deliveryDocument;
          this.deliveryDocumentEntryService.addDeliveryDocumentEntry(deliveryDocumentEntry);
          const areEntriesVisible = true;
          const isAddNewDeliveryEntryButtonVisible = true;
          this.router.navigateByUrl('delivery-document-add', {state: {deliveryDocument, areEntriesVisible, isAddNewDeliveryEntryButtonVisible}});
        },
        err => {
          this.userMessages.length = 0;
          const errors = Object.values(err.error);
          for (const error of errors) {
            this.userMessages.push(error);
          }
          history.state.areEntriesVisible = true;
        }
      );
    }

  }
}
