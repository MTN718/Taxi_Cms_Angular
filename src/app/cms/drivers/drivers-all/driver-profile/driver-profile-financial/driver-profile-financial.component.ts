import { Component, OnInit } from '@angular/core';
import { DriverTransaction } from 'src/app/@models/entities/driver-transaction';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TransactionType } from 'src/app/@models/entities/rider-transaction';
import { CURRENCY_LIST } from 'src/app/currencies';
import { SocketService } from 'src/app/@services/socket/socket.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-driver-profile-financial',
  templateUrl: './driver-profile-financial.component.html',
  styleUrls: ['./driver-profile-financial.component.css']
})
export class DriverProfileFinancialComponent implements OnInit {
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData: DriverTransaction[] = [];
  loading = true;
  sortValue: string | null = null;
  sortKey: string | null = null;
  selectedStatuses: string[] = [];
  driverId: number;
  formTransaction = new FormGroup({});
  modelTransaction;
  fieldsTransaction: FormlyFieldConfig[] = [
    {
      type: 'flex-layout',
      templateOptions: {
        fxLayout: 'row'
      },
      fieldGroup: [
        {
          key: 'transactionType',
          type: 'select',
          templateOptions: {
            required: true,
            label: 'Type',
            options: Object.values(TransactionType).filter(x => { return (x != 'Travel' && x != 'InApp' && x != 'Commission' && x != 'TransferToBank')}).map(x => { return {label: x, value: x}})
          }
        },
        {
          key: 'amount',
          type: 'input',
          templateOptions: {
            required: true,
            label: 'Amount',
            type: 'number'
          }
        },
        {
          key: 'currency',
          type: 'select',
          templateOptions: {
            required: true,
            label: 'Currency',
            options: CURRENCY_LIST
          }
        },
        {
          key: 'documentNumber',
          type: 'input',
          templateOptions: {
            label: 'Document Number'
          }
        },
        {
          key: 'details',
          type: 'input',
          templateOptions: {
            label: 'Details'
          }
        }
      ]
    }
  ]

  sort(sort: { key: string; value: string }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.searchData();
  }
  constructor(private backend: BackendService, private route: ActivatedRoute, private socket: SocketService, private msg: NzMessageService, private router: Router) { }

  async searchData(reset: boolean = false): Promise<void> {
    if (reset) {
      this.pageIndex = 1;
    }
    let query: GetRowsDto = { table: 'DriverTransaction', filters: {driver: {id: this.driverId}}, page: this.pageIndex, pageSize: this.pageSize };
    this.loading = true;
    if (this.sortValue != null) {
      query.sort = { property: this.sortKey, direction: this.sortValue == 'ascend' ? 'ASC' : 'DESC' };
    }
    let res = await this.backend.getRows<DriverTransaction>(query);
    this.loading = false;
    this.total = res.count;
    this.listOfData = res.data;
  }

  ngOnInit(): void {
    this.driverId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.searchData();
  }

  refresh() {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {refresh: new Date().getTime()},
        queryParamsHandling: 'merge',
      });
  }

  onSubmitTransaction() {
    this.formTransaction.value.driverId = this.driverId;
    this.socket.emit('chargeDriver', this.formTransaction.value, async (result: number) => {
      if(result == 200) {
        this.msg.success('Saved Successfully.');
        this.formTransaction.reset();
        this.refresh();
      }
    })
  }
}
