import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import { ProductModel } from '../../../core/models/product.model';
import { AuthService } from '../../../core/services/auth.service';
import { IDictionary } from 'src/app/core/interfaces/dictionary.interface';
import { MoneyPipe } from '../../../core/pipes/money.pipe';
import { UserModel } from '../../../core/models/user.model';

@Component({
  selector: 'app-single-product-cmp',
  templateUrl: './single-product.component.html'
})
export class SingleProductComponent implements OnInit {

    @Input() product: ProductModel;
    @Input() withActions = true;
    @Input() isMarketplace = false;
    IsLoggedIn = false;
    Me:UserModel = new UserModel();
    Image = "assets/img/logo-product.jpg";
    Tags: IDictionary = {} as IDictionary;
    constructor(private products: ProductsService, private auth: AuthService)
    {
        this.products.TagsUpdated.subscribe((val) => {
            if(val){
              this.UpdateTagsList();
            }
          });

        this.auth.onAuthChange$.subscribe((val) => {
          this.IsLoggedIn = this.auth.IsLoggedIn;
        })
        this.auth.onMeChange$.subscribe((val) => {
          this.Me = this.auth.Me;
        })
    }

    ngOnInit()
    {
      this.IsLoggedIn = this.auth.IsLoggedIn;
      this.Me = this.auth.Me;
        this.UpdateTagsList();
        if(this.product.has_image)
          this.Image = this.products.GetProductImageUrl(this.product.id, {width: 480, height: 280});
    }

    UpdateTagsList()
    {
        this.Tags = {} as IDictionary;
        for(const i in this.products.Tags)
        {
            this.Tags[i] = this.products.Tags[i];
        }
    };

}
