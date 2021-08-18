import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/@models/entities/request';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit {
  item: Request;
  tagColor: TagColorService;
  constructor(private route: ActivatedRoute, private _tagColor: TagColorService) {
    this.tagColor = _tagColor;
   }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
    })

  }

}
