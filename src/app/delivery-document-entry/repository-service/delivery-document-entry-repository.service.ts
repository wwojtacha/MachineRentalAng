import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DeliveryDocumentEntry} from '../model/delivery-document-entry.model';

@Injectable()
export class DeliveryDocumentEntryRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  createDeliveryDocumentEntry(deliveryDocumentEntry: DeliveryDocumentEntry) {
    return this.http.post(this.url.DELIVERY_DOCUMENT_ENTRIES, deliveryDocumentEntry);
  }

  getDeliveryDocumentEntries(params: HttpParams) {
    return this.http.get(this.url.DELIVERY_DOCUMENT_ENTRIES, {params});
  }

  deleteDeliveryDocumentEntry(id: number) {
      return this.http.delete(this.url.DELIVERY_DOCUMENT_ENTRIES + id);
  }

  updateDeliveryDocumentEntry(id: number, deliveryDocumentEntry: DeliveryDocumentEntry) {
    return this.http.put(this.url.DELIVERY_DOCUMENT_ENTRIES + id, deliveryDocumentEntry);
  }
}
