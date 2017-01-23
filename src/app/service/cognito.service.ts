import { Injectable, Inject } from "@angular/core";
import { RegistrationUser } from "../public/auth/auth.component";
import { DynamoDBService } from "./ddb.service";
import { AwsUtil } from "./aws.service";

declare var AWSCognito: any;
declare var AWS: any;

export interface CognitoCallback {
    cognitoCallback(message: string, result: any): void;
}

export interface LoggedInCallback {
    isLoggedIn(message: string, loggedIn: boolean): void;
}

export interface Callback {
    callback(): void;
    callbackWithParam(result: any): void;
}

@Injectable()
export class CognitoUtil {

    public static _REGION = "us-east-1";

    public static _IDENTITY_POOL_ID = "us-east-1:5959a687-2b80-4084-9f7e-a0393d08157e";
    // public static _USER_POOL_ID = "us-east-1_PGSbCVZ7S";
    // public static _CLIENT_ID = "hh5ibv67so0qukt55c5ulaltk";

    // public static _POOL_DATA = {
    //     UserPoolId: CognitoUtil._USER_POOL_ID,
    //     ClientId: CognitoUtil._CLIENT_ID
    // };

}

@Injectable()
export class UserRegistrationService {

    constructor( @Inject(CognitoUtil) public cognitoUtil: CognitoUtil) {

    }
}

@Injectable()
export class UserLoginService {

    constructor(public ddb: DynamoDBService, public cognitoUtil: CognitoUtil) {
    }

    // checkLoginState() {
    //     FB.getLoginStatus(function (response) {
    //         statusChangeCallback(response);
    //     });
    // }

    // authenticate(username: string, password: string, callback: CognitoCallback) {
    //     console.log("UserLoginService: stgarting the authentication")
    //     // Need to provide placeholder keys unless unauthorised user access is enabled for user pool
    //     AWSCognito.config.update({ accessKeyId: 'anything', secretAccessKey: 'anything' })

    //     let authenticationData = {
    //         Username: username,
    //         Password: password,
    //     };
    //     let authenticationDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authenticationData);

    //     let userData = {
    //         Username: username,
    //         Pool: this.cognitoUtil.getUserPool()
    //     };

    //     console.log("UserLoginService: Params set...Authenticating the user");
    //     let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);
    //     console.log("UserLoginService: config is " + AWS.config);
    //     cognitoUser.authenticateUser(authenticationDetails, {
    //         onSuccess: function (result) {

    //             // Add the User's Id Token to the Cognito credentials login map.
    //             AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    //                 IdentityPoolId: CognitoUtil._IDENTITY_POOL_ID,
    //                 Logins: {
    //                     'cognito-idp.us-east-1.amazonaws.com/us-east-1_PGSbCVZ7S': result.getIdToken().getJwtToken()
    //                 }
    //             });

    //             console.log("UserLoginService: set the AWS credentials - " + JSON.stringify(AWS.config.credentials));
    //             console.log("UserLoginService: set the AWSCognito credentials - " + JSON.stringify(AWSCognito.config.credentials));
    //             callback.cognitoCallback(null, result);
    //         },
    //         onFailure: function (err) {
    //             callback.cognitoCallback(err.message, null);
    //         },
    //     });
    // }

    // forgotPassword(username: string, callback: CognitoCallback) {
    //     let userData = {
    //         Username: username,
    //         Pool: this.cognitoUtil.getUserPool()
    //     };

    //     let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    //     cognitoUser.forgotPassword({
    //         onSuccess: function (result) {

    //         },
    //         onFailure: function (err) {
    //             callback.cognitoCallback(err.message, null);
    //         },
    //         inputVerificationCode() {
    //             callback.cognitoCallback(null, null);
    //         }
    //     });
    // }

    // confirmNewPassword(email: string, verificationCode: string, password: string, callback: CognitoCallback) {
    //     let userData = {
    //         Username: email,
    //         Pool: this.cognitoUtil.getUserPool()
    //     };

    //     let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

    //     cognitoUser.confirmPassword(verificationCode, password, {
    //         onSuccess: function (result) {
    //             callback.cognitoCallback(null, result);
    //         },
    //         onFailure: function (err) {
    //             callback.cognitoCallback(err.message, null);
    //         }
    //     });
    // }

    // logout() {
    //     console.log("UserLoginService: Logging out");
    //     this.ddb.writeLogEntry("logout");
    //     this.cognitoUtil.getCurrentUser().signOut();

    // }

    isAuthenticated(callback: LoggedInCallback) {
    /*     if (callback == null)
             throw ("UserLoginService: Callback in isAuthenticated() cannot be null");

         let cognitoUser = this.cognitoUtil.getCurrentUser();

         if (cognitoUser != null) {
             cognitoUser.getSession(function (err, session) {
                 if (err) {
                     console.log("UserLoginService: Couldn't get the session: " + err, err.stack);
                     callback.isLoggedIn(err, false);
                 }
                 else {
                     console.log("UserLoginService: Session is " + session.isValid());
                     callback.isLoggedIn(err, session.isValid());
                 }
             });
         } else {
             console.log("UserLoginService: can't retrieve the current user");
             callback.isLoggedIn("Can't retrieve the CurrentUser", false);
     }*/
    }

}

@Injectable()
export class UserParametersService {

    constructor(public cognitoUtil: CognitoUtil) {
    }

    getParameters(callback: Callback) {
        // let cognitoUser = this.cognitoUtil.getCurrentUser();

        // if (cognitoUser != null) {
        //     cognitoUser.getSession(function (err, session) {
        //         if (err)
        //             console.log("UserParametersService: Couldn't retrieve the user");
        //         else {
        //             cognitoUser.getUserAttributes(function (err, result) {
        //                 if (err) {
        //                     console.log("UserParametersService: in getParameters: " + err);
        //                 } else {
        //                     callback.callbackWithParam(result);
        //                 }
        //             });
        //         }

        //     });
        // } else {
        //     callback.callbackWithParam(null);
        // }


    }
}
