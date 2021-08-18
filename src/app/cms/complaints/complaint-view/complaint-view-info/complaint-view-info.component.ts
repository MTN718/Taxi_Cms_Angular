import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/@models/entities/complaint';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/@models/entities/request';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-complaint-view-info',
  templateUrl: './complaint-view-info.component.html',
  styleUrls: ['./complaint-view-info.component.css']
})
export class ComplaintViewInfoComponent implements OnInit {
  item: Request;
  tagColor: TagColorService;
  constructor(private route: ActivatedRoute, private _tagColor: TagColorService) { 
    this.tagColor = _tagColor;
  }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item.request;
    })
    

  }

}
