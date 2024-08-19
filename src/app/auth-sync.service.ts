import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthSyncService {


  // logged in user subject
  // public $user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient) { }

  handleCallback() {
    const code = this.getQueryParam('code');
    if (code) {
      return this.http.get(`http://localhost:3000/auth/sign-in?code=${code}`);
    }
    return null;
  }

  private getQueryParam(param: string): string | null {
    const params = new URLSearchParams(window.location.search);
    return params.get(param);
  }
}
