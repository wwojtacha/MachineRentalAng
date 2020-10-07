import {Injectable} from '@angular/core';
import {Price} from '../model/price.model';
import {Subject} from 'rxjs';

@Injectable()
export class PriceService {

  prices: Price[] = [];
  pricesChanged = new Subject<Price[]>();

  getRecipes() {
    return this.prices.slice();
  }

  setPrices(response: Price[]) {
    this.prices = response;
    this.pricesChanged.next(this.prices.slice());
  }
}
