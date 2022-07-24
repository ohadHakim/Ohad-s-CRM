import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('emailField') firstField!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.email, Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  ngAfterViewInit(): void {
    this.firstField.nativeElement.focus();
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }
    this.authService.login(this.loginForm.value).subscribe({
      next: () => this.router.navigate(['/customers-component']),
      error: (err) => console.error(err),
    });
  }
}
