import { Component, OnInit } from '@angular/core';
import { AdminTransaction, AdminTransactionType } from 'src/app/@models/entities/admin-transaction';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { AdminWallet } from 'src/app/@models/entities/admin-wallet';

@Component({
  selector: 'app-admin-transactions',
  templateUrl: './admin-transactions.component.html',
  styleUrls: ['./admin-transactions.component.css']
})
export class AdminTransactionsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: AdminTransaction[] = [];
  summary: AdminWallet[] = [];
  loading = true;
  queryParams: Params = {};
  tableName = 'AdminTransaction';
  types = Object.values(AdminTransactionType).map(x => { return { text: x, value: x } });

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient, private backend: BackendService) { }

  async searchData(reset: boolean = false, params: Params = this.queryParams): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let as = Object.assign(params, {page: this.pageIndex == 1 ? null : this.pageIndex, pageSize: this.pageSize == 10 ? null : this.pageSize});
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: as,
        queryParamsHandling: 'merge',
      });
  }

  ngOnInit(): void {
    this.route.data.subscribe(x=>{
      this.total = x.items.count;
      this.listOfData = x.items.data;
    });
    this.backend.getRows<AdminWallet>({ table: 'AdminWallet' }).then(x => {
      this.summary = x.data;
    })
    this.route.queryParamMap.subscribe(x => {
      if(x.get('transactionType')) {
        let def = x.get('transactionType').split('|');
        this.types = this.types.map(x => {
          x['byDefault'] = def.includes(x.value);
          return x;
        });
      }
    });
  }

  exportTo(type: string) {
    this.backend.export(this.tableName, type, this.route.snapshot);
  }

  filterStatusChange(value?: string[]): void {
    this.searchData(true, { transactionType: value.length == 0 ? null : value.join('|') });
  }
}
