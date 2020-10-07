import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {UrlKeeper} from '../../utils/url-keeper';
import {Client} from '../model/client.model';


@Injectable()
export class ClientRepositoryService {

  private url = UrlKeeper;

  constructor(private http: HttpClient) {}

  getClients(params: HttpParams) {
    return this.http.get(this.url.CLIENTS, {params});
  }

  createClient(client: Client) {
    return this.http.post(this.url.CLIENTS, client);
  }

  updateClient(id: number, client: Client) {
    return this.http.put(this.url.CLIENTS + id, client);
  }
}
