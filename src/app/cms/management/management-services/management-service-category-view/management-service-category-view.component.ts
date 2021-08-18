import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { ServiceCategory } from 'src/app/@models/entities/service-category';

@Component({
  selector: 'app-management-service-category-view',
  templateUrl: './management-service-category-view.component.html',
  styleUrls: ['./management-service-category-view.component.css']
})
export class ManagementServiceCategoryViewComponent implements OnInit {
  form = new FormGroup({});
  model: ServiceCategory = {};
  fields: FormlyFieldConfig[] = [
    {
      type: 'flex-layout',
      templateOptions: {
        fxLayout: 'column'
      },
      fieldGroup: [
        {
          type: 'flex-layout',
          templateOptions: {
            fxLayout: 'row',
            title: ''
          },
          fieldGroup: [
            {
              key: 'title',
              type: 'input',
              templateOptions: {
                label: 'Title',
                placeholder: 'Title',
                required: true,
              }
            }
          ]
        }

      ]
    }
  ];
  constructor(private route: ActivatedRoute, private router: Router, private backend: BackendService) { }

  ngOnInit(): void {
    this.route.data.subscribe(x => {
      this.model = x.item;
    });
  }

  async onSubmit() {
    delete this.model.services;
    await this.backend.saveRow('ServiceCategory', this.model);
    if(this.model.id == null) {
      this.router.navigate(['../../'], {relativeTo: this.route});
    } else {
      this.router.navigate(['../../../'], {relativeTo: this.route});
    }
  }
}
