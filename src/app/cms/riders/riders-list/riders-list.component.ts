import { Component, OnInit } from '@angular/core';
import { Driver, DriverStatus } from 'src/app/@models/entities/driver';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Rider, RiderStatus } from 'src/app/@models/entities/rider';

@Component({
  selector: 'app-riders-list',
  templateUrl: './riders-list.component.html',
  styleUrls: ['./riders-list.component.css']
})
export class RidersListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Rider[] = [];
  lastNameSearchValue;
  mobileSearchValue;
  driverStatuses = Object.values(RiderStatus).map(x => { return { text: x, value: x } });
  tagColor: TagColorService;
  queryParams: Params = {};

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterName(lastName?: string) {
    this.searchData(true, { lastName: lastName == null ? null : `%${lastName}%`});
  }

  filterMobile(mobileNumber?: string) {
    this.searchData(true, { mobileNumber: mobileNumber == null ? null : `%${mobileNumber}%`});
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
      this.lastNameSearchValue = x.get('lastName') != null ? x.get('lastName').substring(1, x.get('lastName').length - 1) : null;
      this.mobileSearchValue = x.get('mobileNumber') != null ? x.get('mobileNumber').substring(1, x.get('mobileNumber').length - 1) : null;
    })
  }
}
