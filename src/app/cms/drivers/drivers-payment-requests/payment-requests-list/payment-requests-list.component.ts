import { Component, OnInit } from '@angular/core';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { PaymentRequest, PaymentRequestStatus } from 'src/app/@models/entities/payment-request';

@Component({
  selector: 'app-payment-requests-list',
  templateUrl: './payment-requests-list.component.html',
  styleUrls: ['./payment-requests-list.component.css']
})
export class PaymentRequestsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: PaymentRequest[] = [];
  lastNameSearchValue = "";
  mobileSearchValue = "";
  statuses: any[] = Object.values(PaymentRequestStatus).map(x => { return { text: x, value: x } });
  tagColor: TagColorService;
  queryParams: Params = {};

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterStatusChange(value?: string[]): void {
    this.searchData(true, { status: value.length == 0 ? null : value.join('|') });
  }

  constructor(private _tagColor: TagColorService, private route: ActivatedRoute, private router: Router) {
    this.tagColor = _tagColor;
  }

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
    this.route.queryParamMap.subscribe(x => {
      if(x.get('status')) {
        let def = x.get('status').split('|');
        this.statuses = this.statuses.map(x => {
          x['byDefault'] = def.includes(x.value);
          return x;
        });
      }
    })
  }
}
