import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from "@angular/router";
import { CognitoUtil } from "../../service/cognito.service";
import { DynamoDBService } from "../../service/ddb.service";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/bindNodeCallback';
import 'rxjs/add/operator/mergeMap';

declare var AWS: any;
declare const FB: any;

@Component({
    selector: 'facebook-login',
    templateUrl: 'facebooklogin.html',
    // directives: [ROUTER_DIRECTIVES]
})

export class FacebookLoginComponent implements OnInit {

    constructor(public router: Router, private dynamoDBService: DynamoDBService, private zone: NgZone) {
        FB.init({
            appId: '1551266424890061',
            cookie: false,  // enable cookies to allow the server to access
            // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.5' // use graph api version 2.5
        });
    }

    onFacebookLoginClick() {
        FB.login(resp => this.statusChangeCallback(resp));
    }

    statusChangeCallback(resp) {
        if (resp.status === 'connected') {
            // TODO(villela): Sometimes this uses old auth tokens.
            // Add the Facebook access token to the Cognito credentials login map.
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
                Logins: {
                    'graph.facebook.com': resp.authResponse.accessToken
                }
            });
            // TODO(villela): I think this should be bindNodeCallback
            Observable.bindCallback(callback => AWS.config.credentials.get(callback))()
                .flatMap(() => this.dynamoDBService.getCurrentUserInfo())
                .subscribe(
                (data) => {
                    console.log(data);
                    if (!data || !data.Item || !data.Item.account_info || !data.Item.account_info.M.email) {
                        // We need their account info. Send them to that page.
                        this.zone.run(() => this.router.navigate(['/home/setuserinfo']));
                    } else {
                        this.zone.run(() => this.router.navigate(['/securehome']));
                    }
                },
                err => {
                    alert('Error logging in, please try again');
                    console.error(err, err.stack);
                });
    } else if(resp.status === 'not_authorized') {
        FB.login();
    }
}

ngOnInit() {
    FB.getLoginStatus(response => {
        this.statusChangeCallback(response);
    });
}

checkLoginState() {
    FB.getLoginStatus((response) => {
        this.statusChangeCallback(response);
    });
}
}