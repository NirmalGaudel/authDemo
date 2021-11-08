import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get(url: string, options: any = {}) {
    return this.httpClient.get(environment.apiHost + url, {
      headers: options.headers || {
        authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      observe: 'body',
    });
  }

  public post(url: string, body: any, options: any = {}) {
    return this.httpClient.post(environment.apiHost + url, body, options);
  }
}
