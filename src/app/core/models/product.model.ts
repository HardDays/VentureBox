export class ProductModel{
    constructor(
        public id?: number,
        public company_id?: number,
        public name?: string,
        public price?: number,
        public product_type?: string,
        public description?: string,
        public company_name?: string,
        public created_at?: Date,
        public updated_at?: Date,
        public tags?: string[],
        public has_image?: boolean,
        public image?:any
    ){
    }
}
