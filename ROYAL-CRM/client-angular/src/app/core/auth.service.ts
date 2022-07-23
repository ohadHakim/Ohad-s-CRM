import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Login, User } from '../shared/types';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements CanActivateChild {
  private readonly tokenField = 'token';
  redirectUrl: string | null = null; //store url for redirecting after login

  constructor(private apiService: ApiService, private router: Router) {}

  login(details: Login): Observable<User> {
    return this.apiService.login(details).pipe(
      tap((data: User) => {
        if (data.token) {
          localStorage.setItem(this.tokenField, data.token);
          this.apiService.setToken(data.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.tokenField);
    this.apiService.setToken('');
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean> {
    //is user logged in
    if (this.isLoggedIn()) {
      return true;
    }
    //store the attempt url for redirecting
    this.redirectUrl = state.url;

    return this.router.navigate(['login-component']);
  }

  isLoggedIn() {
    const token = localStorage.getItem(this.tokenField);
    return token && token.length > 0 ? true : false;
  }
}
