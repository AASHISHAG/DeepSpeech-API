import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable()
export class AppService {
  constructor(private httpClient: HttpClient ) { }
  baseUrl: string = 'http://localhost:80/';

  save(blob: URL): Observable<{}>{
    return this.httpClient.post(this.baseUrl, blob, httpOptions).pipe(
      data => {
          return data;
      });
    }

    postFile(fileToUpload: File): Observable<{}> {
    console.log("inside upload file")
    const endpoint = this.baseUrl+'file';
    return this.httpClient.post(endpoint, fileToUpload, httpOptions).pipe(
      data => {
          return data;
      });
  }
}