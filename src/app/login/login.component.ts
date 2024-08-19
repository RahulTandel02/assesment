import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { AuthSyncService } from '../auth-sync.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService, private authService: AuthSyncService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      console.log('here')
      this.router.navigate(['home'])
    }
    const callback = this.authService.handleCallback()
    if (callback) {
      callback.subscribe({
        next: (user) => {
          this.router.navigate(['home'])
          localStorage.setItem('user', JSON.stringify(user))
        }
      })
    }
  }

  login() {
    this.api.getLoginUrl().subscribe({
      next: (res) => {
        console.log(res)
        window.location.href = res.url
      }
    })
  }

}
