import { Component, OnInit } from '@angular/core';
import { RequestStatus } from 'src/app/@models/entities/request';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/@models/entities/coupon';

@Component({
  selector: 'app-coupons-list',
  templateUrl: './coupons-list.component.html',
  styleUrls: ['./coupons-list.component.css']
})
export class CouponsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Coupon[] = [];
  titleSearchValue: string;
  statuses = Object.values(RequestStatus).map(x => { return { text: x, value: x } });
  tagColor: TagColorService;
  queryParams: {} = {};

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterName(data?: string) {
    this.searchData(true, { title: data == null ? null : `%${data}%`});
  }

  filterStatusChange(value?: string[]): void {
    this.searchData(true, { status: value.length == 0 ? null : value.join('|') });
  }

  constructor(private backend: BackendService, private _tagColor: TagColorService, private route: ActivatedRoute, private router: Router) {
    this.tagColor = _tagColor;
  }

  async searchData(reset: boolean = false, params: {} = this.queryParams): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let as = Object.assign(params, {page: this.pageIndex == 1 ? null : this.pageIndex, pageSize: this.pageSize == 10 ? null : this.pageSize})
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
      if(x.get('title')) {
        this.titleSearchValue = x.get('title').substring(1, x.get('title').length - 1);
      }
    })
  }

  async changeStatus(id: number, status: boolean) {
    await this.backend.saveRow('Coupon', { id: id, isEnabled: status });
    this.listOfData[this.listOfData.findIndex(x=> { return x.id == id})].isEnabled = status;
  }

  async onDelete(id: number) {
    await this.backend.deleteRow('Coupon', id);
    this.listOfData = this.listOfData.filter(x => x.id != id);
  }
}
