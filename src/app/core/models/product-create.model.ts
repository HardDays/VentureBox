import { ProductModel } from './product.model';
export class ProductCreateModel{
    constructor(
        public image?: string,
        public name?: string,
        public price?: number,
        public product_type?: string,
        public description?: string,
        public tags?: string[]
    ){}

    public static  ProductCreateModelFromProductModel(product: ProductModel)
    {
        const cproduct = new ProductCreateModel();

        cproduct.name = product.name;
        cproduct.price = product.price;
        cproduct.product_type = product.product_type;
        cproduct.description = product.description;
        cproduct.tags = product.tags;
        
        return cproduct;
    }
}