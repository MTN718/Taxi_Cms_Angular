import { Component, OnInit } from '@angular/core';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { RequestReview } from 'src/app/@models/entities/request-review';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-profile-reviews',
  templateUrl: './driver-profile-reviews.component.html',
  styleUrls: ['./driver-profile-reviews.component.css']
})
export class DriverProfileReviewsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: RequestReview[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  selectedStatuses: string[] = [];

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }
  constructor(private backend: BackendService, private tagColor: TagColorService, private route: ActivatedRoute) { }

  async searchData(reset: boolean = false): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let query: GetRowsDto = { table: 'RequestReview', filters: {driver: {id: this.route.snapshot.params['id']}}, page: this.pageIndex, pageSize: this.pageSize, relations: ['request'] };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<RequestReview>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.searchData();
  }
}
