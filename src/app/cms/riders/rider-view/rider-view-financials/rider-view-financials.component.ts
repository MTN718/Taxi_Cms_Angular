import { Component, OnInit } from '@angular/core';
import { RiderTransaction } from 'src/app/@models/entities/rider-transaction';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { DriverTransaction } from 'src/app/@models/entities/driver-transaction';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rider-view-financials',
  templateUrl: './rider-view-financials.component.html',
  styleUrls: ['./rider-view-financials.component.css']
})
export class RiderViewFinancialsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: RiderTransaction[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  riderId: number;

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }
  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  async searchData(reset: boolean = false): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let query: GetRowsDto = { table: 'RiderTransaction', filters: {rider: {id: this.riderId}}, page: this.pageIndex, pageSize: this.pageSize };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<RiderTransaction>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.riderId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.searchData();
  }
}
