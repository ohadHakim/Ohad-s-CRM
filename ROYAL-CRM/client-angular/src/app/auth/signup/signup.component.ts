import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { RegisterUser } from 'src/app/shared/types';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  registerSuccess = false;

  signUpForm = new FormGroup({
    first_name: new FormControl('', {
      validators: Validators.required,
    }),
    last_name: new FormControl('', {
      validators: Validators.required,
    }),
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
    retypePassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  @ViewChild('first') firstField!: ElementRef;
  ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();
  }

  validateData(): boolean {
    if (!this.signUpForm.valid) {
      return false;
    }

    const password = this.signUpForm.get('password');
    const retypePassword = this.signUpForm.get('retypePassword');

    if (
      !password ||
      !retypePassword ||
      password.value !== retypePassword.value
    ) {
      return false;
    }

    return true;
  }

  onSubmit() {
    if (!this.validateData()) {
      return;
    }

    const value: RegisterUser = this.signUpForm.value;

    const details = {
      first_name: value.first_name,
      last_name: value.last_name,
      email: value.email,
      password: value.password,
    };

    this.apiService.register(details).subscribe({
      next: (data) => {
        this.registerSuccess = true;
      },
      error: (err) => {
        this.registerSuccess = false;
        console.log(err);
      },
    });
  }
}
