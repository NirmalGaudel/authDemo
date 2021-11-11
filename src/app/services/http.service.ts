import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  optionsGenerator(headers?: any): any {
    const token = localStorage.getItem('token');
    const options: any = {
      observe: 'body',
      headers: { 'Content-type': headers?.contentType || 'application/json' },
    };
    if (headers?.authorization)
      options.headers.authorization = headers.authorization;
    else if (token) options.headers.authorization = `Bearer ${token}`;
    return options;
  }

  public get(url: string, headers?: any) {
    const options = this.optionsGenerator(headers);
    return this.httpClient.get(environment.apiHost + url, options);
  }

  public post(url: string, body: any, headers?: any) {
    const options = this.optionsGenerator(headers);
    return this.httpClient.post(environment.apiHost + url, body, options);
  }

  public put(url: string, body: any, headers?: any) {
    const options = this.optionsGenerator(headers);
    return this.httpClient.put(environment.apiHost + url, body, options);
  }

  public delete(url: string, headers?: any) {
    const options = this.optionsGenerator(headers);
    return this.httpClient.delete(environment.apiHost + url, options);
  }
}
