import { Component, OnInit } from '@angular/core';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestStatus } from 'src/app/@models/entities/request';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  dateRange: Date[] = [];
  statuses = Object.values(RequestStatus).map(x => { return { text: x, value: x } });
  tagColor: TagColorService;
  queryParams: {} = {};

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterDate(date?: Date[]) {
    this.searchData(true, { requestTimestamp: date == null ? null : `${date[0].toISOString()}^${date[1].toISOString()}`});
  }

  filterStatusChange(value?: string[]): void {
    this.searchData(true, { status: value.length == 0 ? null : value.join('|') });
  }

  constructor(_tagColor: TagColorService, private route: ActivatedRoute, private router: Router) {
    this.tagColor = _tagColor;
  }

  async searchData(reset: boolean = false, params: {} = this.queryParams): Promise<void> {
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
      this.listOfData = x.items.data;
      this.total = x.items.count;
    });
    this.route.queryParamMap.subscribe(x => {
      if(x.get('requestTimestamp') != null) {
        this.dateRange = x.get('requestTimestamp').split('^').map(x => { return new Date(x); });
        console.log(this.dateRange);
      }
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
