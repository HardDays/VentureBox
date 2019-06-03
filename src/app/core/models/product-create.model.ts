import { ProductModel } from './product.model';
export class ProductCreateModel{
    constructor(
        public image?: string,
        public name?: string,
        public price?: number,
        public link_to_store?: string,
        public description?: string,
        public tags?: string[]
    ){}

    public static  ProductCreateModelFromProductModel(product: ProductModel)
    {
        const cproduct = new ProductCreateModel();

        cproduct.name = product.name;
        cproduct.price = product.price;
        cproduct.link_to_store = product.link_to_store;
        cproduct.description = product.description;
        cproduct.tags = product.tags;
        
        return cproduct;
    }
}