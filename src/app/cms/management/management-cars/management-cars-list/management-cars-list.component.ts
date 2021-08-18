import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Car } from 'src/app/@models/entities/car';

@Component({
  selector: 'app-management-cars-list',
  templateUrl: './management-cars-list.component.html',
  styleUrls: ['./management-cars-list.component.css']
})
export class ManagementCarsListComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Car[] = [];
  lastNameSearchValue = "";
  queryParams: {} = {};
  editId: string | null;

  sort(sort: { key: string; value: string }): void {
    this.searchData(true, { orderBy: sort.value == null ? null : `${sort.key},${sort.value}` });
  }

  filterName(lastName?: string) {
    this.searchData(true, { lastName: lastName == null ? null : `%${lastName}%`});
  }

  constructor(private backend: BackendService,  private route: ActivatedRoute, private router: Router, private messageSerivce: NzMessageService) {
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
      this.total = x.items.count;
      this.listOfData = x.items.data;
    });
    this.route.queryParamMap.subscribe(x => {
      if(x.get('lastName')) {
        this.lastNameSearchValue = x.get('lastName').substring(1, x.get('lastName').length - 1);
      }
    })
  }

  startEdit(id: string, event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.editId = id;
  }

  async onSubmitEdit(item: Car) {
    await this.backend.saveRow('Car', item);
    this.editId = null;
  }

  async onAdd(event: any) {
    await this.backend.saveRow('Car', {}, false);
    this.searchData(false, { refresh: new Date().getTime() });
  }

  async onDelete(id: number) {
    await this.backend.deleteRow('Car', id);
    this.listOfData = this.listOfData.filter(x => x.id != id);
  }
}
