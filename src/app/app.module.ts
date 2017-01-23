import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { MaterialModule } from '@angular/material';
import { AppComponent } from "./app.component";
import { UserRegistrationService, UserLoginService, UserParametersService, CognitoUtil } from "./service/cognito.service";
import { routing } from "./app.routes";
import { HomeComponent, AboutComponent, HomeLandingComponent } from "./public/home.component";
import {
    LoginComponent,
    LogoutComponent,
    RegistrationConfirmationComponent,
    ResendCodeComponent,
    ForgotPasswordStep1Component,
    ForgotPassword2Component,
    RegisterComponent
} from "./public/auth/auth.component";
import { FacebookLoginComponent } from "./public/auth/facebooklogin.component";
import { AwsUtil } from "./service/aws.service";
import { UseractivityComponent } from "./secure/useractivity.component";
import { MyProfileComponent } from "./secure/myprofile.component";
import { SecureHomeComponent } from "./secure/securehome.component";
import { JwtComponent } from "./secure/jwt.component";
import { DynamoDBService } from "./service/ddb.service";
import {SetUserInfoComponent} from "./secure/setUserInfo.component";
import 'hammerjs';



@NgModule({
    declarations: [
        LoginComponent,
        LogoutComponent,
        RegistrationConfirmationComponent,
        ResendCodeComponent,
        ForgotPasswordStep1Component,
        ForgotPassword2Component,
        RegisterComponent,
        AboutComponent,
        HomeLandingComponent,
        HomeComponent,
        UseractivityComponent,
        MyProfileComponent,
        SecureHomeComponent,
        JwtComponent,
        AppComponent,
        FacebookLoginComponent,
        SetUserInfoComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        ReactiveFormsModule,
        routing
    ],
    providers: [
        CognitoUtil,
        AwsUtil,
        DynamoDBService,
        UserRegistrationService,
        UserLoginService,
        UserParametersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
