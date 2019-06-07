import { StartupsService } from './../../../core/services/startups.service';
import { CompanyModel } from './../../../core/models/company.model';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';

@Component({
  selector: 'startups-lists-cmp',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class StartupsListsComponent implements OnInit {

    Startups: CompanyModel[] = [];

    constructor(private startupsService: StartupsService, private auth: AuthService)
    {

    }

    ngOnInit() {
      this.GetList();
    }

    GetList() {
      this.startupsService.GetAllCompanies(
        (res) => {
          this.Startups = res.items;
          this.GetImages();
        }
      );
    }

    GetImages () {
      for (let item of this.Startups){
        if (item.has_image) {
          item.image = this.startupsService.GetCompanyImageUrl(item.id, {width: 480, height: 280});
        }
      }
    }


}
