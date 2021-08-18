import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ActivatedRoute } from '@angular/router';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { RiderAddress } from 'src/app/@models/entities/rider-address';

@Component({
  selector: 'app-rider-view-addresses',
  templateUrl: './rider-view-addresses.component.html',
  styleUrls: ['./rider-view-addresses.component.css']
})
export class RiderViewAddressesComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: RiderAddress[] = [];
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
    let query: GetRowsDto = { table: 'RiderAddress', filters: {rider: {id: this.riderId}}, page: this.pageIndex, pageSize: this.pageSize };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<RiderAddress>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.riderId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.searchData();
  }
}
