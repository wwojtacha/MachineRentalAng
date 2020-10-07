import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpParams} from '@angular/common/http';
import {PriceRepositoryService} from '../repository-service/price-repository.service';
import {Router} from '@angular/router';
import {PriceTypeService} from '../../price-type.service';
import {MessageStyler} from '../../../utils/message-styler';
import {Price} from '../model/price.model';
import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit {
  prices = new BehaviorSubject<Price[]>([]);
  priceTypes;
  priceListForm: FormGroup;
  userMessage;
  isError = false;
  messageStyler = MessageStyler;

  constructor(private priceRepositoryService: PriceRepositoryService, private router: Router) {}

  ngOnInit(): void {

    this.priceTypes = PriceTypeService.getAllPriceTypes();

    this.priceListForm = new FormGroup({
      year: new FormControl(''),
      machineNumber: new FormControl(''),
      priceType: new FormControl('')
    });
  }

  onSearch() {

    const params = new HttpParams({
      fromObject: {
        year: this.priceListForm.value.year,
        machineNumber: this.priceListForm.value.machineNumber,
        priceType: this.priceListForm.value.priceType
      }
    });

    this.priceRepositoryService.getPrices(params).subscribe(response => {
      this.prices.next(Object.values(response)[0]);
    });
  }

  onEditPrice(price: Price) {
    this.router.navigateByUrl('price-edit/', {state : {price}});
  }

  onDeletePrice(id: string, index: number) {
    this.priceRepositoryService.deletePrice(id).subscribe(
      data => {
        this.userMessage = 'Price with id: '  + id + ' has been deleted.';
        this.prices.getValue().splice(index, 1);
      },
      err => {
        this.isError = true;
        const entries = Object.entries(err.error);
        for (const entry of entries) {
          if (entry[0] === 'message') {
            this.userMessage = entry[1];
          }
        }
      }
    );
  }
}
