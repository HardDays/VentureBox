import { CompanyModel } from '../models/company.model';
import { LoginModel } from '../models/login.model';
import { HttpService } from './http.service';
import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { UserModel } from '../models/user.model';
import { TokenModel } from '../models/token.model';
import { Router } from '@angular/router';
import { MilestonesModel } from '../models/milestones.model';


@Injectable()
export class MilestonesService {

    constructor(private http: HttpService) {
    }

    PostMilestones(milestones: MilestonesModel) {
      return this.http.PostData('/users/' + milestones.user_id + '/companies/' + milestones.company_id + '/milestones', milestones);
    }

    GetMilestons(user_id: number, company_id: number) {
      return this.http.GetData('/users/' + user_id + '/companies/' + company_id + '/milestones', '');
    }
    GetMilestonsById(user_id: number, company_id: number, id: number) {
      return this.http.GetData('/users/' + user_id + '/companies/' + company_id + '/milestones/' + id, '');
    }

    PatchMileston(milestones: MilestonesModel) {
      // tslint:disable-next-line:max-line-length
      return this.http.PatchData('/users/' + milestones.user_id + '/companies/' + milestones.company_id + '/milestones/' + milestones.id, milestones);
    }

}
