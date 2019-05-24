import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable()
export class AuthService
{
    public FormSizeBig = new Subject<boolean>();
    public CurrentSize:boolean = false;

    constructor()
    {
        this.FormSizeBig.subscribe((val) => {
            this.CurrentSize = val;
        });
    }
}