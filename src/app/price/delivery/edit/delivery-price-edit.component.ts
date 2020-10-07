import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {Client} from '../../../client/model/client.model';
import {Material} from '../../../material/model/material.model';
import {MessageStyler} from '../../../utils/message-styler';
import {DeliveryPrice} from '../model/delivery-price.model';
import {HttpParams} from '@angular/common/http';
import {CostCodeRepositoryService} from '../../../costcode/repository-service/cost-code-repository.service';
import {ClientRepositoryService} from '../../../client/repository-service/client-repository.service';
import {MaterialRepositoryService} from '../../../material/repository-service/material-repository.service';
import {CostCode} from '../../../costcode/model/costcode.model';
import {DeliveryPriceRepositoryService} from '../repository-service/delivery-price-repository.service';
import {DoubleDeliveryPrice} from '../model/double-delivery-price.model';

@Component({
  selector: 'app-delivery-price-edit',
  templateUrl: './delivery-price-edit.component.html',
  styleUrls: ['./delivery-price-edit.component.css']
})
export class DeliveryPriceEditComponent implements OnInit {
  deliveryPriceEditForm: FormGroup;
  contractors = new BehaviorSubject<Client[]>([]);
  contractorNames = [];
  materials = new BehaviorSubject<Material[]>([]);
  materialTypes = [];
  costCodes = new BehaviorSubject<CostCode[]>([]);
  projectCodes = new Set();
  price: DeliveryPrice = history.state.price;
  userMessage;
  isError = false;
  messageStyler = MessageStyler;
  selectedContractor: Client = history.state.price.contractor;
  selectedMaterial: Material = history.state.price.material;
  isNewPriceShown = false;

  constructor(private costCodeRepositoryService: CostCodeRepositoryService,
              private clientRepositoryService: ClientRepositoryService,
              private materialRepositoryService: MaterialRepositoryService,
              private deliveryPriceRepositoryService: DeliveryPriceRepositoryService) {}

  ngOnInit(): void {


    this.deliveryPriceEditForm = new FormGroup({
      editedContractorName: new FormControl(this.price.contractor.name, Validators.required),
      editedMaterialType: new FormControl(this.price.material.type, Validators.required),
      editedPriceType: new FormControl(this.price.priceType, Validators.required),
      editedPriceValue: new FormControl(this.price.price, Validators.required),
      editedStartDate: new FormControl(this.price.startDate, Validators.required),
      editedEndDate: new FormControl(this.price.endDate, Validators.required),
      editedProjectCode: new FormControl(this.price.projectCode, Validators.required),
      newContractorName: new FormControl({value: this.price.contractor.name, disabled: true}, Validators.required),
      newMaterialType: new FormControl({value: this.price.material.type, disabled: true}, Validators.required),
      newPriceType: new FormControl({value: this.price.priceType, disabled: true}, Validators.required),
      newPriceValue: new FormControl(this.price.price, Validators.required),
      newStartDate: new FormControl('', Validators.required),
      newEndDate: new FormControl('', Validators.required),
      newProjectCode: new FormControl({value: this.price.projectCode, disabled: true}, Validators.required)
    });

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

  onSubmit() {
    const price = new DeliveryPrice(
      this.selectedContractor,
      this.selectedMaterial,
      this.deliveryPriceEditForm.value.editedPriceType,
      this.deliveryPriceEditForm.value.editedPriceValue,
      this.deliveryPriceEditForm.value.editedStartDate,
      this.deliveryPriceEditForm.value.editedEndDate,
      this.deliveryPriceEditForm.value.editedProjectCode
    );

    this.deliveryPriceRepositoryService.updatePrice(this.price.id, price).subscribe(
      (data: DeliveryPrice) => {
        this.isError = false;
        this.userMessage = 'Price { ' + Object.values(data)[1].name + ',' + Object.values(data)[2].type + ','
          + Object.values(data).splice(3, 5).toString() + Object.values(data)[8] + ' } has been updated.';
      },
      err => {
        this.isError = true;
        this.userMessage = err.error.message;
      }
    );
  }

  chooseContractor(selectedContractorName: any) {
    for (const contractor of this.contractors.getValue()) {
      if (contractor.name === selectedContractorName) {
        this.selectedContractor = contractor;
        break;
      }
    }
  }

  chooseMaterial(selectedMaterialType: any) {
    for (const material of this.materials.getValue()) {
      if (material.type === selectedMaterialType) {
        this.selectedMaterial = material;
        break;
      }
    }
  }

  onAddNewPrice() {
    if (this.isNewPriceShown === false) {
      this.isNewPriceShown = true;
    } else if (this.isNewPriceShown) {
      this.isNewPriceShown = false;
    }
  }

  onCheckAndSavePrice() {

    const editedDeliveryPrice = new DeliveryPrice(
      this.selectedContractor,
      this.selectedMaterial,
      this.price.priceType,
      this.deliveryPriceEditForm.value.editedPriceValue,
      this.deliveryPriceEditForm.value.editedStartDate,
      this.deliveryPriceEditForm.value.editedEndDate,
      this.price.projectCode
    );

    const newDeliveryPrice = new DeliveryPrice(
      this.selectedContractor,
      this.selectedMaterial,
      this.price.priceType,
      this.deliveryPriceEditForm.value.newPriceValue,
      this.deliveryPriceEditForm.value.newStartDate,
      this.deliveryPriceEditForm.value.newEndDate,
      this.price.projectCode
    );

    const doubleDeliveryPrice = new DoubleDeliveryPrice(
      editedDeliveryPrice,
      newDeliveryPrice
    );

    this.deliveryPriceRepositoryService.updateOnDoublePriceChange(this.price.id, doubleDeliveryPrice).subscribe(
      data => {
        this.isError = false;
        this.userMessage = 'Prices have been updated and set to proper work report entries.';
      },
      err => {
        this.isError = true;
        this.userMessage = err.error.message;
      });
  }
}
