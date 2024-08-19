import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Page } from './home/home.component';
// import { Headers } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getLoginUrl() {
    return this.http.get<any>('http://localhost:3000/auth/get-url')
  }

  getCustomerList(page: Page) {
    const token = localStorage.getItem('user')
    if (token) {
      const userToken = JSON.parse(token).token
      let headers = new HttpHeaders({
        'Authorization': userToken
      })
      // headers.set('Authorization', userToken)
      return this.http.get<any>(`http://localhost:3000/home/customers?size=${page.size}&pageNumber=${page.pageNumber}`, {
        headers: headers
      })
    } else {
      throw new Error('Token not set')
    }
  }

  getTransactionList(accountNo: string) {
    const token = localStorage.getItem('user')
    if (token) {
      const userToken = JSON.parse(token).token
      let headers = new HttpHeaders({
        'Authorization': userToken
      })
      return this.http.get<any>(`http://localhost:3000/home/transaction/${accountNo}`, {
        headers: headers
      })
    } else {
      throw new Error('Token not set')
    }
  }

}
