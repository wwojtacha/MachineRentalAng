import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../utils/url-keeper';
import {Seller} from '../model/seller.model';

@Injectable()
export class SellerRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  getSellers(params: HttpParams) {
    return this.http.get(this.url.SELLERS, {params});
  }

  createSeller(seller: Seller) {
    return this.http.post(this.url.SELLERS, seller);
  }

  updateSeller(id: number, seller: Seller) {
    return this.http.put(this.url.SELLERS + id, seller);
  }

}
