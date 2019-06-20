import { Component, OnInit } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-crm-cmp',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.css']
})
export class CrmComponent implements OnInit {

    URL:any;

    constructor(private sanitizer: DomSanitizer)
    {
      this.URL = this.sanitizer.bypassSecurityTrustResourceUrl("http://34.68.124.215/crm/");
    }
    ngOnInit(): void {
    }
}