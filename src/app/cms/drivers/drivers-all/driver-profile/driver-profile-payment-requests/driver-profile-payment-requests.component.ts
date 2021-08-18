import { Component, OnInit } from '@angular/core';
import { DriverTransaction } from 'src/app/@models/entities/driver-transaction';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ActivatedRoute } from '@angular/router';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-driver-profile-payment-requests',
  templateUrl: './driver-profile-payment-requests.component.html',
  styleUrls: ['./driver-profile-payment-requests.component.css']
})
export class DriverProfilePaymentRequestsComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: PaymentRequest[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  selectedStatuses: string[] = [];
  driverId: number;
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
    let query: GetRowsDto = { table: 'PaymentRequest', filters: {driver: { id: this.driverId } }, page: this.pageIndex, pageSize: this.pageSize };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<PaymentRequest>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.driverId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.searchData();
  }
}
