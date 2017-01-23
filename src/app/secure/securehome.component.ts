import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { LoggedInCallback, UserLoginService } from "../service/cognito.service";

declare const dynamodb: any;
declare var AWS: any;

@Component({
    selector: 'awscognito-angular2-app',
    templateUrl: './secureHome.html'
    // styleUrls: ['/assets/css/sb-admin.css']
})
export class SecureHomeComponent implements OnInit, LoggedInCallback {

    constructor(public router: Router, public userService: UserLoginService) {
        this.userService.isAuthenticated(this);
        console.log("SecureHomeComponent: constructor");
    }

    ngOnInit() {

    }

    isLoggedIn(message: string, isLoggedIn: boolean) {
        if (!isLoggedIn) {
            console.error("ahhh we shouldn't be here!!");
            // this.router.navigate(['/home/login']);
        }
    }
}
