import { TeamMember } from './user.model';

export class CompanyModel {
    constructor(
        public user_id?: number,
        public company_name?: string,
        public website?: string,
        public description?: string,
        public contact_email?: string,
        public image?: string,
        public stage_of_funding?: string,
        public investment_amount?: number,
        public equality_amount?: number,
        public team_members?: TeamMember[],
        public id?: number,
        public has_image?: boolean,
        public evaluation?: number
    ) {}
}
