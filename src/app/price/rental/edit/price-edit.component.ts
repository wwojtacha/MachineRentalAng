import {Component, OnInit} from '@angular/core';
import {PriceTypeService} from '../../price-type.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Price} from '../model/price.model';
import {PriceRepositoryService} from '../repository-service/price-repository.service';
import {ActivatedRoute} from '@angular/router';
import {Machine} from '../../../machine/model/machine.model';
import {MessageStyler} from '../../../utils/message-styler';

@Component({
  selector: 'app-price-edit',
  templateUrl: './price-edit.component.html',
  styleUrls: ['./price-edit.component.css']
})
export class PriceEditComponent implements OnInit {

  price: Price = history.state.price;
  priceTypes;
  priceEditForm: FormGroup;
  userMessage;
  isError = false;
  messageStyler = MessageStyler;

  constructor(private route: ActivatedRoute, private priceRepositoryService: PriceRepositoryService) {
  }

  ngOnInit(): void {

    this.priceTypes = PriceTypeService.getPredefinedPriceTypes();

    const year = this.price.year;
    const machineNumber = this.price.machine.internalId;
    const priceType = this.price.priceType;
    const price = this.price.price;

    this.priceEditForm = new FormGroup({
      year: new FormControl(year, Validators.required),
      machineNumber: new FormControl(machineNumber, Validators.required),
      priceType: new FormControl(priceType, Validators.required),
      priceValue: new FormControl(price, Validators.required)
    });

  }

  onSubmit() {

    const machine = new Machine(this.priceEditForm.value.machineNumber);

    const price = new Price(
      this.priceEditForm.value.year,
      this.priceEditForm.value.priceType,
      this.priceEditForm.value.priceValue,
      machine
    );

    this.priceRepositoryService.updatePrice(this.price.id, price).subscribe(
      (data: Price) => {
        const machineInternalId = data.machine.internalId;
        this.userMessage = 'Price { ' + Object.values(data).splice(1, 3).toString() + ', ' + machineInternalId + ' } has been updated.';
      },
      err => {
        this.isError = true;
        this.userMessage = Object.values(err.error)[0];
      }
    );
  }
}
