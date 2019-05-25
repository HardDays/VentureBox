import { Injectable } from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {Response, Headers, URLSearchParams} from '@angular/http';
import { TokenModel } from '../models/token.model';

declare var Buffer: any;
@Injectable()
export class HttpService {

    serverUrl = 'https://venture-box-back.herokuapp.com';

    public headers: Headers = new Headers([]);
    public token: TokenModel = new TokenModel('');
    constructor(private http: Http) {
        this.BaseHeadersInit();
    }

    BaseInitByToken(data: string) {
        if (data) {
            if (this.headers.has('Authorization')) {
                this.headers.delete('Authorization');
            }
            this.headers.append('Authorization', data);
            this.token = new TokenModel(data);
        }
    }

    BaseHeadersInit() {
        if (!this.headers.has('Content-Type')) {
            this.headers.append('Content-Type', 'application/json');
        }
    }

    GetToken(): TokenModel {
        return this.token;
    }

    GetQueryStr(method: string, params?: string) {
        return this.serverUrl + method + '?' + params;
    }

    GetData(method: string, params?: string) {
        return this.http.get(this.serverUrl + method + '?' + params, {headers: this.headers});
    }

    DeleteData(method: string) {
        return this.http.delete(this.serverUrl + method, {headers: this.headers});
    }

    DeleteDataWithBody(method: string, body: any) {
        return this.http.delete(this.serverUrl + method, new RequestOptions({
            headers: this.headers,
            body: body
          }));
    }

    DeleteDataWithParam(method: string, param) {
        return this.http.delete(this.serverUrl + method + '?' + param, {headers: this.headers});
    }

    PostData(method: string, data: any) {
        return this.http.post(this.serverUrl + method, data, {headers: this.headers});
    }

    PatchData(method: string, data: any) {
        return this.http.patch(this.serverUrl + method, data, {headers: this.headers});
    }

    PutData(method: string, data: string) {
        return this.http.put(this.serverUrl + method, data, {headers: this.headers});
    }

    GetDataFromOtherUrl(url: string) {
        return this.http.get(url);
    }
}
