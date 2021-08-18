import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/@models/entities/region';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Region[] = [];
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
    this.route.queryParamMap.subscribe(x => {
      if(x.get('lastName')) {
        this.lastNameSearchValue = x.get('lastName').substring(1, x.get('lastName').length - 1);
      }
    })
  }

  async changeStatus(id: number, status: boolean) {
    await this.backend.saveRow('Region', {id: id, enabled: status});
    this.listOfData[this.listOfData.findIndex(x=> { return x.id == id})].enabled = status;
  }

  async onDelete(id: number) {
    await this.backend.deleteRow('Region', id);
    this.listOfData = this.listOfData.filter(x => x.id != id);
  }
}
