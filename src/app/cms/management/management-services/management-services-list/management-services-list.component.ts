import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/@models/entities/region';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { ServiceCategory } from 'src/app/@models/entities/service-category';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { Service } from 'src/app/@models/entities/service';

@Component({
  selector: 'app-management-services-list',
  templateUrl: './management-services-list.component.html',
  styleUrls: ['./management-services-list.component.css']
})
export class ManagementServicesListComponent implements OnInit {
  selectedCategory: number;
  services: Service[];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: ServiceCategory[] = [];
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
      this.selectedCategory = 0;
    });
  }

  async changeStatus(id: number, status: boolean) {
    await this.backend.saveRow('Service', {id: id, enabled: status});
    //this.listOfData[this.listOfData.findIndex(x=> { return x.id == id})].enabled = status;
  }

  async deleteCategory(cat: ServiceCategory) {
    await this.backend.deleteRow('ServiceCategory', this.listOfData[this.selectedCategory]);
    this.router.navigate([], { queryParams: {refresh: new Date().getTime()}})
  }

  slectedTabChanged(event: any) {
    //this.services = services;
    alert(this.selectedCategory);
    this
  }

}