import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { Fleet } from 'src/app/@models/entities/fleet';
import { FleetWallet } from 'src/app/@models/entities/fleet-wallet';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-fleet-view',
  templateUrl: './fleet-view.component.html',
  styleUrls: ['./fleet-view.component.css']
})
export class FleetViewComponent implements OnInit {
  item: Fleet;
  topWallet: FleetWallet;
  tagColor: TagColorService;

  constructor(private route: ActivatedRoute, private _tagColor: TagColorService, private backend: BackendService) {
    this.tagColor = _tagColor;
  }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
      if(x.item.wallet != null) {
        this.topWallet = x.item.wallet.sort((a, b) => { return b.amount - a.amount })[0];
      }
    });
  }
}
