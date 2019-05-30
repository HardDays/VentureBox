export class UserModel {
    constructor(
        public id?: number,
        public email?: string,
        public password?: string,
        public name?: string,
        public surname?: string,
        public password_confirmation?: string,
        public phone?: string,
        public role?: string,
        public goals?: string,

        public company_name?: string,
        public website?: string,
        public description?: string,
        public contact_email?: string,
        public image?: string,
        public stage_of_funding?: string,
        public investment_amount?: number,
        public equality_amount?: number,
        public team_members?: TeamMember[],

        public company_id?: number,
        public token?: string
    ) {
      if (!role) {
        this.role = 'startup';
      }
      if (! team_members) {
        this.team_members = [];
      }
    }
}

export class TeamMember {
   constructor(
        public team_member_name?: string,
        public c_level?: string,
        public c_level_name?: string,
        public isOpened?: boolean
    ) {}
}
