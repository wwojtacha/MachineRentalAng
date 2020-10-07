import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../utils/url-keeper';
import {Order} from '../model/order.model';

@Injectable()
export class OrderRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createOrder(order: Order) {
    return this.http.post(this.url.ORDERS, order);
  }

  getOrders(params: HttpParams) {
    return this.http.get(this.url.ORDERS, {params});
  }

  getOrder(id: number) {
    return this.http.get(this.url.ORDERS + id);
  }

  updateOrder(id: number, order: Order) {
    return this.http.put(this.url.ORDERS + id, order);
  }

  deleteOrder(id: number) {
    return this.http.delete(this.url.ORDERS + id);
  }
}
