import { AuthService } from 'src/app/core/services/auth.service';
import { HttpService } from 'src/app/core/services/http.service';
import {Injectable, NgZone} from "@angular/core";
import * as _ from "lodash";
import {GoogleAuthService} from "ng-gapi/lib/GoogleAuthService";
import GoogleUser = gapi.auth2.GoogleUser;
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable()
export class GoogleService {
    public static readonly SESSION_STORAGE_KEY: string = "accessToken";
    private user: GoogleUser = undefined;

    constructor(private googleAuthService: GoogleAuthService,
                private authService: AuthService,
                private ngZone: NgZone, private http: HttpService) {
    }

    public setUser(user: GoogleUser): void {
        this.user = user;
    }

    public getCurrentUser(): GoogleUser {
        return this.user;
    }

    public getToken(): string {
        let token: string = sessionStorage.getItem(GoogleService.SESSION_STORAGE_KEY);
        if (!token) {
            throw new Error("no token set , authentication required");
        }
        return sessionStorage.getItem(GoogleService.SESSION_STORAGE_KEY);
    }

    public signIn(success: (res) => void) {
        this.googleAuthService.getAuth().subscribe((auth) => {
          auth.grantOfflineAccess().then(
          (res) => {
              var access_token = auth.currentUser.get().getAuthResponse().access_token;
              auth.currentUser.listen(
                () => {
                  access_token = auth.currentUser.get().getAuthResponse().access_token;
                  success({refresh_token: res.code, access_token: auth.currentUser.get().getAuthResponse().access_token});
                }
              );
            }
          );
        });
    }


    public SetGoogleAuthCode (refresh_token, access_token, success?: (ok) => void, fail?:(err) => void) {
      return this.http.CommonRequest(
                () => this.http.PostData('/users/' + this.authService.Me.id + '/companies/' + this.authService.Me.company_id + '/google_events', {refresh_token, access_token}),
                success,
                fail
              );
    }

    public SetGoogleCalendar (google_calendar_id, success?: (ok) => void, fail?:(err) => void) {
      return this.http.CommonRequest(
                () => this.http.PostData('/users/' + this.authService.Me.id + '/companies/' + this.authService.Me.company_id + '/google_events/set_google_calendar', {google_calendar_id}),
                success,
                fail
              );
    }

    public GetGoogleEvents(success?: (ok) => void, fail?:(err) => void) {
      return this.http.CommonRequest(
                () => this.http.GetData('/users/' + this.authService.Me.id + '/companies/' + this.authService.Me.company_id + '/google_events', ''),
                success,
                fail
              );
    }

    public signOut(): void {
        this.googleAuthService.getAuth().subscribe((auth) => {
            try {
                auth.signOut();
            } catch (e) {
                console.error(e);
            }
        });
    }

    public isUserSignedIn(): boolean {
        return !_.isEmpty(sessionStorage.getItem(GoogleService.SESSION_STORAGE_KEY));
    }

    private signInSuccessHandler(res: GoogleUser) {
        this.ngZone.run(() => {
            this.user = res;
            sessionStorage.setItem(
                GoogleService.SESSION_STORAGE_KEY, res.getAuthResponse().access_token
            );
        });
    }

    private signInErrorHandler(err) {
        console.warn(err);
    }
}
