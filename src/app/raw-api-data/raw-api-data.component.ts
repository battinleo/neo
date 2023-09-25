import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_KEY, API_ROOT } from '../data/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-raw-api-data',
  template: `
    {{ data$ | async | json }}
  `
})
export class RawApiDataComponent implements OnInit {
  public data$ = new Observable();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;

    let params = new HttpParams();
    params = params.set('start_date', todayString);
    params = params.set('end_date', todayString);
    params = params.set('api_key', API_KEY);

    this.data$ = this.http.get(API_ROOT, { params });
  }
}
