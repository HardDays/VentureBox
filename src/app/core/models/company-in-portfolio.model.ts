export class CompanyInPortfolioModel {
    constructor(
        public id?: number,
        public company_id?: number,
        public company_name?: string,
        public evaluation?: number,
        public image?: string,
        public investment?: string,
        public investor_id?: number,
        public company_has_image?: boolean
    ) {
    }
}
