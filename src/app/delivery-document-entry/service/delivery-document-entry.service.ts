import {Injectable} from '@angular/core';
import {DeliveryDocumentEntry} from '../model/delivery-document-entry.model';

@Injectable()
export class DeliveryDocumentEntryService {

  private deliveryDocumentEntries: DeliveryDocumentEntry[] = [];

  addDeliveryDocumentEntry(deliveryDocumentEntry: DeliveryDocumentEntry) {
    this.deliveryDocumentEntries.push(deliveryDocumentEntry);
  }

  getDeliveryDocumentEntries() {
    return this.deliveryDocumentEntries.slice();
  }

  clearDeliveryDocumentEntries() {
    this.deliveryDocumentEntries.length = 0;
  }

  addDeliveryDocumentEntries(deliveryDocumentEntries: DeliveryDocumentEntry[]) {
    this.deliveryDocumentEntries.push.apply(this.deliveryDocumentEntries, deliveryDocumentEntries);
  }

  updateDeliveryDocumentEntry(index: number, deliveryDocumentEntry: DeliveryDocumentEntry) {
    this.deliveryDocumentEntries[index] = deliveryDocumentEntry;
  }

  getDeliveryDocumentEntry(index: number) {
    return this.deliveryDocumentEntries.slice()[index];
  }

  deleteDeliveryDocumentEntry(index: number) {
    this.deliveryDocumentEntries.splice(index, 1);
  }

}
