import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'products-edit-cmp',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class ProductsEditComponent implements OnInit {

    Mode = "edit";
    constructor(private _location: Location) {
    }

    ngOnInit() 
    {

    }

    GoBack()
    {
        this._location.back();
    }
}