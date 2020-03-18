import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.page.html',
  styleUrls: ['./users-table.page.scss'],
})
export class UsersTablePage implements OnInit {

  page = 0;
  resultsCount = 10;
  totalPages = 10;

  data:any = [];
  bulkEdit = false;

  sortDirection = 0;
  sortKey = null;
  edit = {};

  constructor(private http: HttpClient) { 
    this.loadData();
  }

  ngOnInit() {
  }

  // función que devuelve datos a través de una llamada http
  loadData() {
    this.http.get('assets/data/userData.json').subscribe(res => {
      // añado los resultados al array llamado data
      this.data = res;
      this.sort();
    })
  }

  // funcion que ordena
  sortBy(key) {
    this.sortKey = key;
    this.sortDirection++;
    this.sort();
  }

  sort() {
    if(this.sortDirection == 1) {
      this.data = this.data.sort((a,b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valA.localeCompare(valB);
      });
    } else if (this.sortDirection == 2) {
      this.data = this.data.sort((a,b) => {
        const valA = a[this.sortKey];
        const valB = b[this.sortKey];
        return valB.localeCompare(valA);
      });
    } else {
      this.sortDirection = 0;
      this.sortKey = null;
    }
  }

  toggleBulkEdit() {
    this.bulkEdit = !this.bulkEdit;
    this.edit = {};
  }

  bulkDelete() {
    let toDelete = Object.keys(this.edit); 
    const reallyDelete = toDelete.filter(index => this.edit[index]).map(key => +key);

    while(reallyDelete.length) {
      this.data.splice(reallyDelete.pop(), 1);
    }
    this.toggleBulkEdit();
  }

  removeRow(index) {
    this.data.splice(index, 1);
  }

  nextPage() {
    this.page++;
    this.loadData();
  }

  prevPage(){
    this.page--;
    this.loadData();
  }
  
  goFirst() {
    this.page = 0;
    this.loadData();
  }

  goLast() {
    this.page = this.totalPages - 1;
    this.loadData();
  }

}
