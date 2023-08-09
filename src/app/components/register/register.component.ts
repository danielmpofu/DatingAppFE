import {Component, OnInit} from '@angular/core';
import {AccountService} from "../../services/account.service";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup<any>({});

  formData: any = {}
  formValidators = [Validators.required];
  passwordValidators = [Validators.minLength(4), Validators.maxLength(8)];


  initializeForm() {
    this.registerForm = this.formBuilderService.group({
      gender: [['Male'], [...this.formValidators]],
      username: ['', [...this.formValidators]],
      knownAs: ['', [...this.formValidators]],
      dateOfBirth: ['', [...this.formValidators]],
      city: ['', [...this.formValidators]],
      country: ['', [...this.formValidators]],
      password: ['', [...this.formValidators, ...this.passwordValidators]],
      confirmPassword: ['', [...this.formValidators, ...this.passwordValidators, this.matchValues('password')]],
      phone: ['', [...this.formValidators, Validators.minLength(8), Validators.maxLength(11)]],
      email: ['', [...this.formValidators, Validators.email]],
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

  constructor(private accountService: AccountService,
              private formBuilderService: FormBuilder,
              private toastrService: ToastrService,
              private router: Router,
              //private accountService:AccountService,
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {

  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      if (control) {
        // @ts-ignore
        return control.value === control.parent?.get(matchTo).value ? null : {notMatching: true};
      } else {
        return null;
      }
    }
  }

  doRegister(): void {
    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: resp => {
          console.log(resp);
          // this.registerForm.reset();
          // this.accountService.login({
          //   username: this.registerForm.value.username,
          //   password: this.registerForm.value.password
          // });

          //this.router.navigateByUrl('/members');
        },error: err => {
          console.log(err);
        }
      })
    } else {
      this.toastrService.error("You have some errors, please fix them to proceed.");
    }

  }

}
