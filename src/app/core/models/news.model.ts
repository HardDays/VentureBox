export class NewsModel {
    constructor(
        public id?: number,
        public user_id?: number,
        public company_id?: number,
        public text?: string,
        public company_name?: string,
        public created_at?: string,
        public updated_at?: string
    ) {
    }
}
