import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  getMediData() {
    return this.http.get('https://hpb.health.gov.lk/api/get-current-statistical')
  }
}
