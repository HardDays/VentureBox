export class MilestonesModel {
    constructor(
        public id?: number,
        public user_id?: number,
        public company_id?: number,
        public title?: string,
        public finish_date?: string,
        public description?: string,
        public company_name?: string,
        public created_at?: string,
        public updated_at?: string,

        public is_done?: boolean,
        public completeness?: string
    ) {
    }
}
