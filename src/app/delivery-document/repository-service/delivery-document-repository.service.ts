import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DeliveryDocument} from '../model/delivery-document.model';

@Injectable()
export class DeliveryDocumentRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createDeliveryDocument(deliveryDocument: DeliveryDocument) {
    return this.http.post(this.url.DELIVERY_DOCUMENTS, deliveryDocument);
  }

  getDeliveryDocuments(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_DOCUMENTS, {params});
  }

  getDeliveryDocument(documentNumber: string) {
    return this.http.get(this.url.DELIVERY_DOCUMENTS + documentNumber);
  }

  updateDeliveryDocument(id: string, deliveryDocument: DeliveryDocument) {
    return this.http.put(this.url.DELIVERY_DOCUMENTS + id, deliveryDocument);
  }

  deleteWorkDocument(id: number) {
    return this.http.delete(this.url.DELIVERY_DOCUMENTS + id);
  }

}
