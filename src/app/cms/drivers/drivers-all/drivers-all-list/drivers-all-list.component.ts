import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Driver, DriverStatus } from 'src/app/@models/entities/driver';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { camelCase } from "camel-case";
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drivers-all-list',
  templateUrl: './drivers-all-list.component.html',
  styleUrls: ['./drivers-all-list.component.css']
})
export class DriversAllListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Driver[] = [];
  lastNameSearchValue;
  mobileSearchValue;
  statuses = [];
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

  constructor(private _tagColor: TagColorService, private route: ActivatedRoute, private router: Router, private translator: TranslateService) {
    this.translator.get(Object.values(DriverStatus).map(x => { return 'enum.driver.status.' + camelCase(x) })).toPromise().then(y => {
      this.statuses = Object.keys(y).map(z => {
        return { text: y[z], value: (y[z] as string).toLowerCase() }
      });
    })
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

  toCamelCase(value: string) {
    return camelCase(value)
  }

  ngOnInit(): void {
    this.route.data.subscribe(x=>{
      this.total = x.drivers.count;
      this.listOfData = x.drivers.data;
    });
    this.route.queryParamMap.subscribe(x => {
      this.lastNameSearchValue = x.get('lastName')?.substring(1, x.get('lastName').length - 1);
      this.mobileSearchValue = x.get('mobileNumber')?.substring(1, x.get('mobileNumber').length - 1);
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