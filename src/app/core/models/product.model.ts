export class ProductModel{
    constructor(
        public id?: number,
        public company_id?: number,
        public name?: string,
        public price?: number,
        public link_to_store?: string,
        public description?: string,
        public startup_name?: string,
        public created_at?: Date,
        public updated_at?: Date,
        public tags?: string[]
    ){
        if(!startup_name)
            this.startup_name = "Some Startup";
    }
}