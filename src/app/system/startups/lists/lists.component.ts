import { TypeService } from 'src/app/core/services/type.service';
import { StartupsService } from './../../../core/services/startups.service';
import { CompanyModel, InvestedModel } from './../../../core/models/company.model';
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
    isModalOpened = false;
    InvestedCompanyID = 0;
    InvestedInfo = new InvestedModel();
    public mask = [/[1-9]/, /[0-9]/];

    constructor(private startupsService: StartupsService, private auth: AuthService, private type: TypeService)
    {

    }

    Errors = {
      investment: '',
      evaluation: '',
    };

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

    openModalInvest(idStartup:number) {
      this.isModalOpened = true;
      this.InvestedCompanyID = idStartup;
    }

    InvestToCompany () {
      this.startupsService.InvestingCompany(
        this.InvestedCompanyID,
        this.InvestedInfo,
        (res) => {
          this.isModalOpened = false;
        }, (err) => {
           this.Errors = this.type.GetErrorsDictByResponse(err.json(), this.Errors);
        });
    }

    InterestingCompany (id: number) {
      this.startupsService.InterestingCompany(
        id,
        (res) => {
        });
    }


}
