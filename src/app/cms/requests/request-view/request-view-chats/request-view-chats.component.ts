import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ActivatedRoute } from '@angular/router';
import { RequestChat } from 'src/app/@models/entities/request-chat';
import { Driver } from 'src/app/@models/entities/driver';
import { Rider } from 'src/app/@models/entities/rider';

@Component({
  selector: 'app-request-view-chats',
  templateUrl: './request-view-chats.component.html',
  styleUrls: ['./request-view-chats.component.css']
})
export class RequestViewChatsComponent implements OnInit {
  chats: RequestChat[];
  rider: Rider;
  driver: Driver;
  requestId: number;

  constructor(private backend: BackendService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.requestId = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.driver = this.route.snapshot.data.item.driver;
    this.rider = this.route.snapshot.data.item.rider;
    this.refreshData();
  }

  async refreshData() {
    this.chats = (await this.backend.getRows<RequestChat>({ table: 'RequestChat', filters: {request: { id: this.requestId } } })).data;
  }

}
