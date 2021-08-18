import { Component, OnInit } from '@angular/core';
import { Rider, RiderStatus } from 'src/app/@models/entities/rider';
import { RiderWallet } from 'src/app/@models/entities/rider-wallet';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-rider-view',
  templateUrl: './rider-view.component.html',
  styleUrls: ['./rider-view.component.css']
})
export class RiderViewComponent implements OnInit {
  item: Rider;
  topWallet: RiderWallet;
  tagColor: TagColorService;
  environment;

  constructor(private route: ActivatedRoute, private _tagColor: TagColorService, private backend: BackendService) {
    this.tagColor = _tagColor;
    this.environment = environment;
  }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
      this.topWallet = x.item.wallet?.sort((a, b) => { return b.amount - a.amount })[0];
    });
  }

  async changeStatus(status: string) {
    await this.backend.saveRow('Rider', { id: this.item.id, status: status });
    this.item.status = status as RiderStatus;
  }
}
