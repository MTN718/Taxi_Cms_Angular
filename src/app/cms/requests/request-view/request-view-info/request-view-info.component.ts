import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Request } from 'src/app/@models/entities/request';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';

@Component({
  selector: 'app-request-view-info',
  templateUrl: './request-view-info.component.html',
  styleUrls: ['./request-view-info.component.css']
})
export class RequestViewInfoComponent implements OnInit {
  item: Request;
  mapsAddress: string;
  tagColor: TagColorService;
  
  constructor(private route: ActivatedRoute, private _tagColor: TagColorService) {
    this.tagColor = _tagColor;
   }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
      this.mapsAddress = `https://maps.googleapis.com/maps/api/staticmap?size=800x300&path=weight:3|color:orange|enc:${this.item.log != null ? `&path=weight:3|color:orange|enc:${this.item.log}` : ''}${this.item.points.map(x=>{ return `&markers=color:blue%7Clabel:P%7C${x.y},${x.x}` }).join('')}&key=${(<any>window).mAPI}`
      console.log(this.mapsAddress);
    })
  }

}
