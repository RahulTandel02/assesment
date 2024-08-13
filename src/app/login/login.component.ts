import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit(): void {
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
