import {Injectable} from '@angular/core';
import {WorkDocument} from '../model/work-document.model';

@Injectable()
export class WorkDocumentService {

  private cachedWorkDocuments: WorkDocument[] = [];


  addWorkDocuments(workDocuments: WorkDocument[]) {
    this.cachedWorkDocuments = workDocuments;
  }

  getWorkDocuments() {
    return this.cachedWorkDocuments.slice();
  }

  clearWorkDocuments() {
    this.cachedWorkDocuments.length = 0;
  }
}
