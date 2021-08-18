import { Component, OnInit } from '@angular/core';
import { Driver, DriverStatus } from 'src/app/@models/entities/driver';
import { ActivatedRoute } from '@angular/router';
import { DriverWallet } from 'src/app/@models/entities/driver-wallet';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { environment } from 'src/environments/environment';
import { Media } from 'src/app/@models/entities/media';
import { camelCase } from 'camel-case';

@Component({
  selector: 'app-driver-profile',
  templateUrl: './driver-profile.component.html',
  styleUrls: ['./driver-profile.component.css']
})
export class DriverProfileComponent implements OnInit {
  driver: Driver;
  topWallet: DriverWallet;
  tagColor: TagColorService;
  environment: any;

  constructor(private route: ActivatedRoute, private _tagColor: TagColorService, private backend: BackendService, private message: NzMessageService) {
    this.tagColor = _tagColor;
    this.environment = environment;
  }

  ngOnInit(): void {
    this.route.data.subscribe(async (x) => {
      this.driver = x.item;
      let wallets = await this.backend.getRows<DriverWallet>({table: 'DriverWallet', filters: { driver: {id : x.item.id }}});
      this.topWallet = wallets.data.sort((a, b) => { return b.amount - a.amount })[0];
      if(this.driver.media != null) {
        let image = await this.backend.getRows<Media>({ table: 'Media', filters: { id: this.driver.media}});
        this.driver.media = image.data[0];
      }
    });
  }

  toCamelCase(value: string) {
    return camelCase(value)
  }

  async changeStatus(status: string) {
    await this.backend.saveRow('Driver', { id: this.driver.id, status: status });
    this.driver.status = status as DriverStatus;
  }
}
