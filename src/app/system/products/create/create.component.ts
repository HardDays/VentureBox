import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'products-create-cmp',
  templateUrl: './../edit/edit.component.html',
  styleUrls: ['./../edit/edit.component.css']
})
export class ProductsCreateComponent implements OnInit {

    Mode = "create";
    constructor() {
    }

    ngOnInit() {
    }



}