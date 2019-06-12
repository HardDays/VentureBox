import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TypeService } from 'src/app/core/services/type.service';
import { ProductModel } from 'src/app/core/models/product.model';

import {Location} from '@angular/common';
import { UserModel } from '../../core/models/user.model';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Validator } from '../../core/base/field.validator';

@Component({
  selector: 'app-settings-cmp',
  templateUrl: './settings.component.html'
})
export class SettingsComponent implements OnInit {

    Me: UserModel = new UserModel();
    GeneralSuccess = false;
    EmailSuccess = false;
    PasswordSuccess = false;

    GeneralForm: FormGroup = new FormGroup({
        "name": new FormControl(this.Me.name, [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3)
        ]),
        "surname": new FormControl(this.Me.surname, [
            Validators.required,
            Validators.maxLength(50),
            Validators.minLength(3)
        ]),
        "is_email_notifications_available": new FormControl(this.Me.is_email_notifications_available)
    });

    EmailForm: FormGroup = new FormGroup({
        "current_email": new FormControl(this.Me.email, [
            Validators.required,
            Validators.email,
            this.IncorrectCurrentEmail(this.Me.email)
        ]),
        "email": new FormControl("",[
            Validators.required,
            Validators.email,
            this.IncorrectNewEmail(this.Me.email)
        ]),
        "current_password": new FormControl("",[
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50)
        ])
    });

    PasswordForm: FormGroup = new FormGroup({
        "old_password": new FormControl("",[
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(50)
        ]),
        "password": new FormControl("",[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            // this.MatchPasswords()
        ]),
        "password_confirmation": new FormControl("",[
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
            this.MatchPasswords()
        ])
    });

    constructor(private _location: Location, private auth: AuthService,
        private productsService: ProductsService, private router: Router,
        private route: ActivatedRoute, private typeService: TypeService) 
    {
        this.auth.onMeChange$.subscribe((me: UserModel) => {
            this.Me = me;
            this.InitForms();
        });
    }

    ngOnInit() 
    {
        this.Me = this.auth.Me;
        this.InitForms();
    }

    InitForms()
    {
        this.InitGeneralForm();
        this.InitEmailForm();
        this.InitPasswordForm();
        // this.GeneralForm.setValue(this.Me);
    }

    InitGeneralForm()
    {
        if(this.Me)
        {
            for(const i in this.GeneralForm.controls)
            {
                if(this.Me && this.Me[i])
                {
                    this.GeneralForm.controls[i].setValue(this.Me[i]);
                }
            }
        
            // this.GeneralForm.controls.turn_email_notifications.setValue(this.Me.is_email_notifications_available);
            
        }
        
    }

    InitEmailForm()
    {
        if(this.Me)
        {
            for(const i in  this.EmailForm.controls)
            {
                this.EmailForm.controls[i].setValue('');
            }
            
            this.EmailForm.reset();
            this.EmailForm.controls.current_email.setValue(this.Me.email);
        }
    }

    InitPasswordForm()
    {
        for(const i in this.PasswordForm.controls)
        {
            this.PasswordForm.controls[i].setValue('');
        }
        this.PasswordForm.reset();
    }


    UpdateGeneral()
    {
        this.GeneralForm.updateValueAndValidity();
        const valid = this.GeneralForm.valid;

        if(valid)
        {
            const vals = this.GeneralForm.getRawValue();
            this.auth.UpdateMyGeneralInfo(vals, (res) => {
                this.GeneralSuccess = true;
                setTimeout(()=>{
                    this.GeneralSuccess = false;
                }, 3000);
            }, (err) => {
            })
        }
    }

    UpdateEmail()
    {
        this.EmailForm.updateValueAndValidity();
        const valid = this.EmailForm.valid;

        if(valid)
        {
            const vals = this.EmailForm.getRawValue();
            // this.EmailForm.controls.current_password.updateValueAndValidity();
            this.auth.UpdateMyEmailInfo(vals, (res) => {
                this.EmailSuccess = true;
                setTimeout(()=>{
                    this.EmailSuccess = false;
                }, 3000);
            }, (err) => {
                if(err.status == 422)
                {
                    if(err.body){
                        if(err.body.current_password)
                        {
                            this.EmailForm.controls.current_password.setErrors({'not_match': true});
                        }
                        if(err.body.email)
                        {
                            this.EmailForm.controls.email.setErrors({'email_taken':true});
                        }
                    }
                }
            })
        }
    }

    UpdatePassword()
    {
        this.PasswordForm.updateValueAndValidity();
        const valid = this.PasswordForm.valid;

        if(valid)
        {
            const vals = this.PasswordForm.getRawValue();
            // this.EmailForm.controls.current_password.updateValueAndValidity();
            this.auth.UpdateMyPassword(vals, (res) => {
                this.PasswordSuccess = true;
                setTimeout(()=>{
                    this.PasswordSuccess = false;
                }, 3000);
            }, (err) => {
                if(err.status == 422)
                {
                    if(err.body){
                        if(err.body.old_password)
                        {
                            this.PasswordForm.controls.old_password.setErrors({'not_match': true});
                        }
                    }
                }
            })
        }
    }

    get name()
    {
        return this.GeneralForm.get('name');
    }

    get surname()
    {
        return this.GeneralForm.get('surname');
    }

    IncorrectCurrentEmail(Val)
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.Me && this.Me.email)
            {
                const forbidden = this.Me.email != control.value;
                return forbidden ?  {'incorrect_current_email': {value: control.value}} : null;
            }
            return null;
        };
    }

    IncorrectNewEmail(Val)
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.Me && this.Me.email)
            {
                const forbidden = this.Me.email == control.value;
                return forbidden ?  {'incorrect_new_email': {value: control.value}} : null;
            }
            return null;
        };
    }

    get current_email()
    {
        return this.EmailForm.get('current_email');
    }

    get email()
    {
        return this.EmailForm.get('email');
    }

    get current_password()
    {
        return this.EmailForm.get('current_password');
    }

    MatchPasswords()
    {
        return (control: AbstractControl): {[key: string]: any} | null => {
            if(this.PasswordForm && this.PasswordForm.controls)
            {
                const values = this.PasswordForm.getRawValue();
                const forbidden = values.password != values.password_confirmation;
                return forbidden ?  {'not_match': {value: control.value}} : null;
            }
            return null;
        };
    }

    get old_password()
    {
        return this.PasswordForm.get('old_password');
    }

    get password()
    {
        return this.PasswordForm.get('password');
    }

    get password_confirmation()
    {
        return this.PasswordForm.get('password_confirmation');
    }



}