import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  public get(url: string, options: any={}) {
    return this.httpClient.get(url, options);
  }

  public post(url: string, body: any, options:any = {}) {
    return this.httpClient.post(url, body,options);
  }
}
