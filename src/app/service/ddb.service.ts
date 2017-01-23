import { Injectable } from "@angular/core";
import { Stuff } from "../secure/useractivity.component";
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/bindNodeCallback';

declare var AWS: any;
declare var AWSCognito: any;

@Injectable()
export class DynamoDBService {

    constructor() {
        console.log("DynamoDBService: constructor");
    }

    getCurrentUserInfo(): Observable<any> {
        const params = {
            TableName: 'Accounts', /* required */
            Key: {
                'account_id': {
                    S: AWS.config.credentials.params.IdentityId,
                },
            }
        };
        // TODO stick the dynamodb in a class var.
        const dynamodb = new AWS.DynamoDB();
        return Observable.bindNodeCallback(callback => dynamodb.getItem(params, callback))();
    }

    addNewUser(user: { first: string, last: string, email: string, phone: string }): Observable<any> {
        const params = {
            TableName: 'Accounts', /* required */
            Item: {
                'account_id': {
                    S: AWS.config.credentials.params.IdentityId, // TODO pull into helper
                },
                'account_info': {
                    M: {
                        'first': {
                            S: user.first,
                        },
                        'last': {
                            S: user.last,
                        },
                        'email': {
                            S: user.email,
                        },
                        'phone': {
                            S: user.phone,
                        },
                    },
                }
            },
        };
        // TODO stick the dynamodb in a class var.
        const dynamodb = new AWS.DynamoDB();
        return Observable.bindNodeCallback(callback => dynamodb.putItem(params, callback))();
    }

    getLogEntries(mapArray: Array<Stuff>) {
        console.log("DynamoDBService: reading from DDB with creds - " + AWS.config.credentials);
        var params = {
            TableName: 'LoginTrail',
            KeyConditionExpression: "userId = :userId",
            ExpressionAttributeValues: {
                ":userId": AWS.config.credentials.params.IdentityId
            }
        };

        var docClient = new AWS.DynamoDB.DocumentClient();
        docClient.query(params, onQuery);

        function onQuery(err, data) {
            if (err) {
                console.error("DynamoDBService: Unable to query the table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                // print all the movies
                console.log("DynamoDBService: Query succeeded.");
                data.Items.forEach(function (logitem) {
                    mapArray.push({ type: logitem.type, date: logitem.activityDate });
                });
            }
        }
    }

    writeLogEntry(type: string) {
        try {
            let date = new Date().toString();
            console.log("DynamoDBService: Writing log entry. Type:" + type + " ID: " + AWS.config.credentials.params.IdentityId + " Date: " + date);
            this.write(AWS.config.credentials.params.IdentityId, date, type);
        } catch (exc) {
            console.log("DynamoDBService: Couldn't write to DDB");
        }

    }

    write(data: string, date: string, type: string): void {
        console.log("DynamoDBService: writing " + type + " entry");
        var DDB = new AWS.DynamoDB({
            params: { TableName: 'LoginTrail' }
        });

        // Write the item to the table
        var itemParams =
            {
                Item: {
                    userId: { S: data },
                    activityDate: { S: date },
                    type: { S: type }
                }
            };
        DDB.putItem(itemParams, function (result) {
            console.log("DynamoDBService: wrote entry: " + JSON.stringify(result));
        });
    }

}


