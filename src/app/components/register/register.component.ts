import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup<any>({});

  formData: any = {}
  formValidators = [Validators.required];

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('',
        this.formValidators),
      password: new FormControl('',
        [Validators.required, Validators.min(4), Validators.max(8)]),
      confirmPassword: new FormControl('',[Validators.required, this.matchValues('password')]),
      phone: new FormControl('',this.formValidators),
      email: new FormControl('',this.formValidators),
    });

    this.registerForm.controls('password').valueChanges().subscribe()
  }

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

  matchValues(matchTo: string) :ValidatorFn {
   return (control:AbstractControl) => {
     if(control) {
       // @ts-ignore
       return control.value === control.parent?.get(matchTo).value ? null : {notMatching: true};
     }else{
       return  null;
     }
   }
  }

  doRegister(): void {
    console.log(this.registerForm);
  }

}
