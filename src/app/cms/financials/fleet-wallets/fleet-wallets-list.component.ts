import { Component, OnInit } from '@angular/core';
import { FleetWallet } from 'src/app/@models/entities/fleet-wallet';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AdminTransactionType } from 'src/app/@models/entities/admin-transaction';
import { HttpClient } from '@angular/common/http';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { FleetTransactionType } from 'src/app/@models/entities/fleet-transaction';
import { Region } from 'src/app/@models/entities/region';

@Component({
  selector: 'app-fleet-wallets-list',
  templateUrl: './fleet-wallets-list.component.html',
  styleUrls: ['./fleet-wallets-list.component.css']
})
export class FleetWalletsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: FleetWallet[] = [];
  loading = true;
  queryParams: Params = {};
  tableName = 'FleetWallet';
  currencies = [];
  amountRange: number[] = [null,null];
  selectedCurrency = null;

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
    this.backend.getRows<Region>({table: 'Region'}).then(x => {
      this.currencies = x.data.map(item => item.currency).filter((value, index, self) => self.indexOf(value) === index).map(y => { return {value: y, text: y } } );
      if(this.selectedCurrency != null) {
        this.currencies.filter(x => x.value == this.selectedCurrency)[0]['byDefault'] = true;
      }
    });
    this.route.queryParamMap.subscribe(x => {
      this.selectedCurrency = x.get('currency');
      if(x.get('amount')) {
        let def = x.get('amount').split('^');
        this.amountRange = [parseInt(def[0]), parseInt(def[1])];
      }
    });
  }

  exportTo(type: string) {
    this.backend.export(this.tableName, type, this.route.snapshot);
  }

  filterCurrencyChange(value?: string): void {
    this.searchData(true, { currency: value });
  }

  filterAmount(range: number[]) {
    this.searchData(true, {amount: range != null ? `${range[0]}^${range[1]}` : null})

  }
}
