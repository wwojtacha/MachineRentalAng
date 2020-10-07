import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../../utils/url-keeper';
import {HourPrice} from '../model/hour-price.model';
import {DoubleHourPrice} from '../model/double-hour-price.model';

@Injectable()
export class HourPriceRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.url.HOUR_PRICES, formData);
  }

  getPrices(params: HttpParams) {
    return this.http.get(this.url.HOUR_PRICES, {params});
  }

  getMatchingPrices(params: HttpParams) {
    return this.http.get(this.url.HOUR_PRICES + 'matchingPrice', {params});
  }

  getPrice(id: string) {
    return this.http.get(this.url.HOUR_PRICES + id);
  }

  updatePrice(id: number, price: HourPrice) {
    return this.http.put(this.url.HOUR_PRICES + id, price);
  }

  updateOnDoublePriceChange(id: number, doubleHourPrice: DoubleHourPrice) {
    return this.http.put(this.url.HOUR_PRICES + 'editAndSave/' + id, doubleHourPrice);
  }

  deletePrice(id: string) {
    return this.http.delete(this.url.HOUR_PRICES + id);
  }

}
