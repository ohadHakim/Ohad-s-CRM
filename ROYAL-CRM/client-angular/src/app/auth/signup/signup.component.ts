import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit, AfterViewInit {
  signUpForm = new FormGroup({
    firstName: new FormControl('', {
      validators: Validators.required,
    }),
    lastName: new FormControl('', {
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

  constructor() {}

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
    console.log(this.signUpForm.value);
    console.log(this.validateData());

    if (!this.validateData()) {
      return;
    }
  }
}
