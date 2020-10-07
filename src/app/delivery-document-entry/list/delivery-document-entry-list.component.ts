import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {DeliveryDocumentEntry} from '../model/delivery-document-entry.model';
import {DeliveryDocumentEntryService} from '../service/delivery-document-entry.service';
import {HttpParams} from '@angular/common/http';
import {DeliveryDocumentEntryRepositoryService} from '../repository-service/delivery-document-entry-repository.service';
import {Router} from '@angular/router';
import {ErrorDialogComponent} from '../../error-dialog/error-dialog.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-delivery-document-entry-list',
  templateUrl: './delivery-document-entry-list.component.html',
  styleUrls: ['./delivery-document-entry-list.component.css']
})
export class DeliveryDocumentEntryListComponent implements OnInit {

  deliveryDocumentEntries = new BehaviorSubject<DeliveryDocumentEntry[]>([]);
  isEditButtonShown;

  constructor(private deliveryDocumentEntryService: DeliveryDocumentEntryService,
              private deliveryDocumentEntryRepositoryService: DeliveryDocumentEntryRepositoryService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {

    // if (history.state.shouldGetDataFromDb) {

    if (history.state.isOnAddNewDeliveryDocument === true) {

      this.deliveryDocumentEntryService.clearDeliveryDocumentEntries();
      this.deliveryDocumentEntries.next(this.deliveryDocumentEntryService.getDeliveryDocumentEntries());
    } else {

      const deliveryDocument = history.state.deliveryDocument;

      const params = new HttpParams({
        fromObject: {
          deliveryDocumentNumber: deliveryDocument.documentNumber
        }
      });

      this.deliveryDocumentEntryService.clearDeliveryDocumentEntries();

      this.deliveryDocumentEntryRepositoryService.getDeliveryDocumentEntries(params).subscribe((response: DeliveryDocumentEntry[]) => {
        this.deliveryDocumentEntryService.addDeliveryDocumentEntries(response);
        this.deliveryDocumentEntries.next(this.deliveryDocumentEntryService.getDeliveryDocumentEntries());
      });
    }


    // }

    this.deliveryDocumentEntries.next(this.deliveryDocumentEntryService.getDeliveryDocumentEntries());
  }

  onEditDeliveryDocumentEntry(deliveryDocumentEntry: DeliveryDocumentEntry, index: number) {
    this.router.navigateByUrl('delivery-document-entry-add/', {state: {deliveryDocumentEntry, index}});
  }

  onDeleteDeliveryDocumentEntry(id: number, index: number) {
    if (id === undefined) {
      this.deliveryDocumentEntryService.deleteDeliveryDocumentEntry(index);
      this.deliveryDocumentEntries.getValue().splice(index, 1);
    } else {
      this.deliveryDocumentEntryRepositoryService.deleteDeliveryDocumentEntry(id).subscribe(
        data => {
          this.deliveryDocumentEntryService.deleteDeliveryDocumentEntry(index);
          this.deliveryDocumentEntries.getValue().splice(index, 1);
        },
        err => {
          let userMessage;
          const entries = Object.entries(err.error);
          for (const entry of entries) {
            if (entry[0] === 'message') {
              userMessage = entry[1];
            }
          }

          this.dialog.open(ErrorDialogComponent, {
            width: '450px',
            data: userMessage
          });
        }
      );
    }
  }

}
