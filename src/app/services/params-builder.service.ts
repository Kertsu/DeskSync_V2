import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamsBuilderService {

  constructor() { }

  buildParams(event: any){
    let params = new HttpParams();

    if (event.filters) {
      params = params.set('filters', JSON.stringify(event.filters));
    }
    if (event.first !== undefined) {
      params = params.set('first', event.first);
    }
    if (event.rows !== undefined) {
      params = params.set('rows', event.rows);
    }
    if (event.sortField) {
      params = params.set('sortField', event.sortField);
    }
    if (event.sortOrder !== undefined) {
      params = params.set('sortOrder', event.sortOrder);
    }
    if (event.globalFilter !== undefined) {
      params = params.set('globalFilter', event.globalFilter);
    }

    return params
  }
}
