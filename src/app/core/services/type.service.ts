import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { HttpService } from './http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


import {TokenModel} from '../models/token.model';

@Injectable()
export class TypeService {

    constructor(private http: HttpService, private router: Router) { }

    ParamsToUrlSearchParams(params: any): string {
      const options = new URLSearchParams();
      // tslint:disable-next-line: forin
      for (const key in params) {
          const prop: any = params[key];
          if (prop) {
              if ( prop instanceof Array) {
                  for (const i in prop) {
                      if (prop[i]) {
                          options.append(key + '[]', prop[i]);
                      }
                  }
              } else {
                  options.set(key, params[key]);
              }
          }
      }
      return options.toString();
    }

    StringJSON(params) {
      let options = '';
      options += '{';
      // tslint:disable-next-line: forin
      for (const key in params) {
          const prop: any = params[key];
          if (prop) {
            if ( prop instanceof Array) {
                  for (const i in prop) {
                      if (prop[i]) {
                          options += '"' + key + '"' + ':' + '["' + prop[i] + '"]' + ',';
                      }
                  }
              } else {
                  options += '"' + key + '":' + '"' + params[key] + '"' + ',';
              }
          }
      }
      options = options.slice(0, options.length - 1);
      options += '}';
      return options;
    }

    GetDateStringFormat(date: Date) {
      return date.toISOString().split('T')[0];
    }

    DateToUTCDateISOString(input) {
      const date = new Date(input);
      return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000).toISOString();
    }

}


