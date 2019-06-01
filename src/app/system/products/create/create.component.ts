import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'products-create-cmp',
  templateUrl: './../edit/edit.component.html',
  styleUrls: ['./../edit/edit.component.css']
})
export class ProductsCreateComponent implements OnInit {

    Mode = "create";
    constructor(private _location: Location) {
    }

    ngOnInit() {
    }

    GoBack()
    {
        this._location.back();
    }

}
