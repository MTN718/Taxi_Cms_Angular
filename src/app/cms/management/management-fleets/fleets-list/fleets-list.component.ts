import { Component, OnInit } from '@angular/core';
import { PaymentGateway } from 'src/app/@models/entities/payment-gateway';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Fleet } from 'src/app/@models/entities/fleet';

@Component({
  selector: 'app-fleets-list',
  templateUrl: './fleets-list.component.html',
  styleUrls: ['./fleets-list.component.css']
})
export class FleetsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Fleet[] = [];
  lastNameSearchValue = "";
  queryParams: Params = {};
  tagColor: TagColorService;

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterName(lastName?: string) {
    this.searchData(true, { lastName: lastName == null ? null : `%${lastName}%`});
  }

  constructor(private backend: BackendService,  private route: ActivatedRoute, private router: Router, private _tagColor: TagColorService, private messageSerivce: NzMessageService) {
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
  }
}
