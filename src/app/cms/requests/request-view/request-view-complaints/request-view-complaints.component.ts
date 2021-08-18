import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/@models/entities/complaint';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-view-complaints',
  templateUrl: './request-view-complaints.component.html',
  styleUrls: ['./request-view-complaints.component.css']
})
export class RequestViewComplaintsComponent implements OnInit {
  total = 1;
  listOfData: Complaint[] = [];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.listOfData = x.item.complaints;
      this.total = x.item.complaints.length;
    })
  }
}
