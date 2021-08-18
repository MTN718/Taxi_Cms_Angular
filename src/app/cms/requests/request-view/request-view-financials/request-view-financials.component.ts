import { Component, OnInit } from '@angular/core';
import { DriverTransaction } from 'src/app/@models/entities/driver-transaction';
import { ActivatedRoute } from '@angular/router';
import { RiderTransaction } from 'src/app/@models/entities/rider-transaction';
import { FleetTransaction } from 'src/app/@models/entities/fleet-transaction';
import { AdminTransaction } from 'src/app/@models/entities/admin-transaction';

@Component({
  selector: 'app-request-view-financials',
  templateUrl: './request-view-financials.component.html',
  styleUrls: ['./request-view-financials.component.css']
})
export class RequestViewFinancialsComponent implements OnInit {
  driverTransactions: DriverTransaction[] = [];
  riderTransactions: RiderTransaction[] = [];
  adminTransactions: AdminTransaction[] = [];
  fleetTransactions: FleetTransaction[] = [];
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.driverTransactions = x.item.driverTransactions;
      this.riderTransactions = x.item.riderTransactions;
      this.adminTransactions = x.item.adminTransactions;
      this.fleetTransactions = x.item.fleetTransactions;
    })
  }

}
