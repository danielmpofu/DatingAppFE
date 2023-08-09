import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    registerForm: FormGroup = new FormGroup<any>({});

    formData: any = {}

    initializeForm() {
        this.registerForm = new FormGroup({
            username: new FormControl(),
            password: new FormControl(),
            confirmPassword: new FormControl(),
            phone: new FormControl(),
            email: new FormControl(),
        });

        this.registerForm
            .controls["password"]
            .valueChanges
            .subscribe({
                next: () => {
                    this.registerForm.controls['confirmPassword'].updateValueAndValidity()
                }
            });
    }

    constructor(private accountService: AccountService) {
    }

    ngOnInit(): void {
        this.initializeForm();
    }

    doRegister(): void {
        console.log(this.registerForm);
    }

}
