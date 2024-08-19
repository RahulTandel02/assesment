import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Router } from '@angular/router';

/**
 * An object used to get page information from the server
 */
export class Page {
  // The number of elements in the page
  size: number = 0;
  // The total number of elements
  totalElements: number = 0;
  // The total number of pages
  totalPages: number = 0;
  // The current page number
  pageNumber: number = 0;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) {
    this.page.pageNumber = 0
    this.page.size = 10
  }
  ColumnMode = ColumnMode
  rows = [];
  columns = [{ prop: 'name' }, { name: 'Username' }, { name: 'Address' }, { name: 'Birthdate' }, { name: 'email' }, { name: 'Accounts' }];

  page = new Page()

  transactions = []

  ngOnInit(): void {
    this.setPage({ offset: 0 })
  }

  setPage(pageInfo: any) {
    console.log(pageInfo)
    this.page.pageNumber = pageInfo.offset
    this.api.getCustomerList(this.page).subscribe({
      next: (res) => {
        this.page = res.page
        this.rows = res.data
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  getTransaction(accountNo: string) {
    this.api.getTransactionList(accountNo).subscribe({
      next: (res) => {
        this.transactions = res
      }
    })
  }


  logout() {
    localStorage.removeItem('user')
    this.router.navigate(['login'])
  }

}
