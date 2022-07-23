import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  @ViewChild('emailField') firstField!: ElementRef;
  ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      error: (err) => console.error(err),
    });
  }
}
