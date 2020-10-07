import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {EstimatePosition} from '../model/estimate.position';

@Injectable()
export class EstimatePositionRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {
  }

  getEstimatePositions(params: HttpParams) {
    return this.http.get(this.url.ESTIMATES, {params});
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.url.ESTIMATES, formData);
  }

  createEstimatePosition(estimatePosition: EstimatePosition) {
    return this.http.post(this.url.ESTIMATES, estimatePosition);
  }

  updateEstimatePosition(id: number, estimatePosition: EstimatePosition) {
    return this.http.put(this.url.ESTIMATES + id, estimatePosition);
  }
}
