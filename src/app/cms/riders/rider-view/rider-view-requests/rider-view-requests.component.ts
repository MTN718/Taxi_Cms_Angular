import { Component, OnInit } from '@angular/core';
import { Request } from 'src/app/@models/entities/request';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ActivatedRoute } from '@angular/router';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { RiderTransaction } from 'src/app/@models/entities/rider-transaction';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-rider-view-requests',
  templateUrl: './rider-view-requests.component.html',
  styleUrls: ['./rider-view-requests.component.css']
})
export class RiderViewRequestsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: Request[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  riderId: number;
  tagColor: TagColorService;

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }
  constructor(private backend: BackendService, private route: ActivatedRoute, private _tagColor: TagColorService) {
    this.tagColor = _tagColor;
   }

  async searchData(reset: boolean = false): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let query: GetRowsDto = { table: 'Request', filters: {rider: {id: this.riderId}}, page: this.pageIndex, pageSize: this.pageSize };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<Request>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.riderId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.searchData();
  }
}
