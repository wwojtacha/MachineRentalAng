import {Injectable} from '@angular/core';
import {UrlKeeper} from '../../utils/url-keeper';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Operator} from '../model/operator.model';
import {Client} from '../../client/model/client.model';

@Injectable()
export class OperatorRepositoryService {

  url = UrlKeeper;

  constructor(private http: HttpClient) {}

  createOperator(operator: Operator) {
    return this.http.post(this.url.OPERATORS, operator);
  }

  updateOperator(id: number, operator: Operator) {
    return this.http.put(this.url.OPERATORS + id, operator);
  }

  getOperators(params: HttpParams) {
    return this.http.get(this.url.OPERATORS, {params});
  }
}
