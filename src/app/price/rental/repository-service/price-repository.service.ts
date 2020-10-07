import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../../utils/url-keeper';
import {Price} from '../model/price.model';
import {PriceService} from './price.service';

@Injectable()
export class PriceRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient, private priceService: PriceService) {
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.url.PRICES, formData);
  }

  getPrices(params: HttpParams) {
    return this.http.get(this.url.PRICES, {params});
  }

  getPrice(id: string) {
    return this.http.get(this.url.PRICES + id);
  }

  updatePrice(id: string, price: Price) {
    return this.http.put(this.url.PRICES + id, price);
  }

  deletePrice(id: string) {
    return this.http.delete(this.url.PRICES + id);
  }

  getPredefinedPrices(params: HttpParams) {
    this.http.get(this.url.PRICES, {params})
    .subscribe((response: Price[]) => {
      this.priceService.setPrices(response);
    });
  }
}
