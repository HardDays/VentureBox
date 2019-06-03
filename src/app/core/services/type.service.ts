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

    GetErrorText (error) {
      const errors = {
        'LOGIN_DOES_NOT_EXIST' : 'Login doesn\'t exist'
      };

      return errors[error] ? errors[error] : error;

    }

    GetErrorsByResponse (errors) {
      let Errors = '';
      // tslint:disable-next-line: forin
      for (const key in errors) {
        const value = errors[key];
        for (const item of value) {
          Errors += key.slice(0, 1).toUpperCase() + key.slice(1).replace('_', ' ').toLowerCase();
          Errors += ' ' + item.replace('_', ' ').toLowerCase() + '. ';
        }
      }
      return Errors;
    }

    GetErrorsDictByResponse (errors, type) {
      let Errors = type;
      for (const key in Errors) {
          Errors[key] = '';
      }
      for (const key in errors) {
        const value = errors[key];
        let errs = '';
        for (const item of value) {
          errs += key.slice(0, 1).toUpperCase() + key.slice(1).replace(new RegExp('_', 'g'), ' ').toLowerCase();
          errs += ' ' + item.replace(new RegExp('_', 'g'), ' ').toLowerCase() + '. ';
        }
        if(Errors[key] == '')
          Errors[key] = errs;
      }
      return Errors;
    }

    ReadImages(files: any, callback?: (params?) => any) {
      for ( const f of files) {
          const file: File = f;
          if (!file) {
            break;
          }
          const myReader: FileReader = new FileReader();
          myReader.onloadend = (e) => {
              callback(myReader.result);
          };
          myReader.readAsDataURL(file);
      }
    }



    GetEnumStageOfFunding() {
      return this.http.GetData('/enums/stage_of_funding', '');
    }
    GetEnumClevels() {
      return this.http.GetData('/enums/c_level', '');
    }

    async LoadImageFromUrl(url)
    {
      var res = await fetch(url);
      var blob = await res.blob();

      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.addEventListener("load", function(){
          resolve(reader.result);
        }, false);

        reader.onerror = () => {
          return reject(this);
        }

        reader.readAsDataURL(blob);
      });
    }

}


