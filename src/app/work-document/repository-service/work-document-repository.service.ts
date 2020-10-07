import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {WorkDocument} from '../model/work-document.model';

@Injectable()
export class WorkDocumentRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createWorkDocument(workDocument: WorkDocument) {
    return this.http.post(this.url.WORK_DOCUMENTS, workDocument);
  }

  getWorkDocuments(params: HttpParams) {
    return this.http.get(this.url.WORK_DOCUMENTS, {params});
  }

  getWorkDocument(id: string) {
    return this.http.get(this.url.WORK_DOCUMENTS + id);
  }

  updateWorkDocument(id: string, workDocument: WorkDocument) {
    return this.http.put(this.url.WORK_DOCUMENTS + id, workDocument);
  }

  deleteWorkDocument(id: string) {
    return this.http.delete(this.url.WORK_DOCUMENTS + id);
  }
}
