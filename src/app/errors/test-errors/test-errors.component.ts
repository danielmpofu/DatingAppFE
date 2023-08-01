import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-test-errors',
    templateUrl: './test-errors.component.html',
    styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {

    baseUrl = "http://localhost:5108/api/v1/Buggy/";
    accountBaseUrl: string = "http://localhost:5108/api/v1/Account/";

    serverErrors:string[]= [];

    constructor(private httpClient: HttpClient) {
    }

    ngOnInit(): void {
    }

    getEntityValidationError() {
        this.httpClient.post(this.accountBaseUrl, {}).subscribe({
            next: value => {
                console.log(value);
            }, error: err => {
                console.log(err);
                this.serverErrors = err;

            }
        });
    }

    get404Error() {
        this.httpClient.get(this.baseUrl + 'not-found')
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.log(error);
                }
            })
    }

    get500Error() {
        this.httpClient.get(this.baseUrl + 'server-error')
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.log(error);
                }
            })
    }

    getBadRequest() {
        this.httpClient.get(this.baseUrl + 'bad-request')
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.log(error);
                }
            })
    }

    getUnauthorized() {
        this.httpClient.get(this.baseUrl + 'auth')
            .subscribe({
                next: response => {
                    console.log(response);
                },
                error: error => {
                    console.log(error);
                }
            })
    }

}
