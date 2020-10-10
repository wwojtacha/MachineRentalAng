import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../../utils/url-keeper';
import {DeliveryPrice} from '../model/delivery-price.model';
import {DoubleDeliveryPrice} from '../model/double-delivery-price.model';

@Injectable()
export class DeliveryPriceRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.url.DELIVERY_PRICES, formData);
  }

  getPrices(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_PRICES, {params});
  }

  getMatchingPrice(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_PRICES + 'matchingPrice', {params});
  }

  updatePrice(id: number, price: DeliveryPrice) {
    return this.http.put(this.url.DELIVERY_PRICES + id, price);
  }

  updateOnDoublePriceChange(id: number, doubleDeliveryPrice: DoubleDeliveryPrice) {
    return this.http.put(this.url.DELIVERY_PRICES + 'editAndSave/' + id, doubleDeliveryPrice);
  }

  deletePrice(id: number) {
    return this.http.delete(this.url.DELIVERY_PRICES + id);
  }

  getMatchingPrices(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_PRICES + 'matchingPrice', {params});
  }
}
