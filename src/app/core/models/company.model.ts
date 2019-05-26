export class CompanyModel {
    constructor(
        public user_id?: number,
        public name?: string,
        public website?: string,
        public description?: string,
        public contact_email?: string,
        public image?: string
    ) {}
}
export class TeamMember {
   constructor(
        public name?: string,
        public level?: string,
        public isOpened?: boolean
    ) {}
}
