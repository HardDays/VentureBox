export class UserModel {
    constructor(
        public email?: string,
        public password?: string,
        public name?: string,
        public surname?: string,
        public password_confirmation?: string,
        public phone?: string,
        public role?: string,
        public goals?: string
    ) {
      if (!role) {
        this.role = 'startup';
      }
    }
}
