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
      // console.log(window.location.hostname);
      this.URL = this.sanitizer.bypassSecurityTrustResourceUrl("http://ec2-18-222-201-141.us-east-2.compute.amazonaws.com:8080");
    }
    ngOnInit(): void {
    }
}