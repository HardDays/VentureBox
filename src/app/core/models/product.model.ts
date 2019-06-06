export class ProductModel{
    constructor(
        public id?: number,
        public company_id?: number,
        public name?: string,
        public price?: number,
        public link_to_store?: string,
        public description?: string,
        public company_name?: string,
        public created_at?: Date,
        public updated_at?: Date,
        public tags?: string[],
        public has_image?: boolean
    ){
    }
}