import { Component, OnInit } from '@angular/core';
import { Complaint } from 'src/app/@models/entities/complaint';
import { ActivatedRoute } from '@angular/router';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { BackendService } from 'src/app/@services/backend/backend.service';

@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.css']
})
export class ComplaintViewComponent implements OnInit {
  item: Complaint;
  tagColor: TagColorService;
  constructor(private route: ActivatedRoute, private _tagColor: TagColorService, private backend: BackendService) {
    this.tagColor = _tagColor;
   }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.item = x.item;
    })
  }

  async changeStatus(status: boolean) {
    await this.backend.saveRow('Complaint', { id: this.item.id, isReviewed: status });
    this.item.isReviewed = status;
  }
}
