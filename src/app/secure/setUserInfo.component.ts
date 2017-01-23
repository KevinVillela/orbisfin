import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { LoggedInCallback, UserLoginService } from "../service/cognito.service";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {DynamoDBService} from '../service/ddb.service';
declare const dynamodb: any;
declare var AWS: any;

const EMAIL_REGEX = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
const PHONE_REGEX = '^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$';

@Component({
    selector: 'set-user-info',
    templateUrl: './setuserinfo.html'
})
export class SetUserInfoComponent implements OnInit {

    public complexForm: FormGroup;
    constructor(fb: FormBuilder, private dynamoDBService: DynamoDBService, private zone: NgZone, private router: Router){
        this.complexForm = fb.group({
            'first': [null, Validators.compose([Validators.required])],
            'last': [null, Validators.compose([Validators.required])],
            'email' : [null, Validators.compose([Validators.required, <any>Validators.pattern(EMAIL_REGEX)])],
            'phone': [null, Validators.compose([Validators.required, <any>Validators.pattern(PHONE_REGEX)])],
        });
    }

    ngOnInit() {

    }
    submitForm() {
        this.dynamoDBService.addNewUser(this.complexForm.value)
        .subscribe(
            () => {
                this.zone.run(() => this.router.navigate(['/securehome']));
            },
            (err) => {
                alert('Error saving user data, please try again.')
                console.error(err, err.stack);
            });
    }
}
