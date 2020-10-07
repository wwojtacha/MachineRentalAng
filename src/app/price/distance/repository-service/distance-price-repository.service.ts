import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../../utils/url-keeper';
import {DistancePrice} from '../model/distance-price.model';
import {DoubleHourPrice} from "../../hour/model/double-hour-price.model";
import {DoubleDistancePrice} from "../model/double-distance-price.model";

@Injectable()
export class DistancePriceRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.url.DISTANCE_PRICES, formData);
  }

  getPrices(params: HttpParams) {
    return this.http.get(this.url.DISTANCE_PRICES, {params});
  }

  getMatchingPrice(params: HttpParams) {
    return this.http.get(this.url.DISTANCE_PRICES + 'matchingPrice', {params});
  }

  updatePrice(id: number, price: DistancePrice) {
    return this.http.put(this.url.DISTANCE_PRICES + id, price);
  }

  updateOnDoublePriceChange(id: number, doubleDistancePrice: DoubleDistancePrice) {
    return this.http.put(this.url.DISTANCE_PRICES + 'editAndSave/' + id, doubleDistancePrice);
  }

  deletePrice(id: string) {
    return this.http.delete(this.url.DISTANCE_PRICES + id);
  }

  getMatchingPrices(params: HttpParams) {
    return this.http.get(this.url.DISTANCE_PRICES + 'matchingPrice', {params});
  }
}
