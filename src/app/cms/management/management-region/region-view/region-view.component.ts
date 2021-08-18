import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { GoogleMap } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/@services/backend/backend.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Subscription } from 'rxjs';
import { Region } from 'src/app/@models/entities/region';
import { CURRENCY_LIST } from 'src/app/currencies';

@Component({
  selector: 'app-region-view',
  templateUrl: './region-view.component.html',
  styleUrls: ['./region-view.component.css']
})
export class RegionViewComponent implements OnInit {
  form = new FormGroup({});
  model: Region = {};
  mapLoaded = false;
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
              key: 'name',
              type: 'input',
              templateOptions: {
                label: 'Name',
                placeholder: 'Name',
                required: true
              }
            },
            {
              key: 'currency',
              type: 'select',
              templateOptions: {
                label: 'Currency',
                placeholder: 'Currency',
                options: CURRENCY_LIST,
                required: true
              }
            }

          ]
        }

      ]
    }
  ];
  @ViewChild(GoogleMap, {static: false}) map: GoogleMap;
  center = {lat: 24, lng: 12};
  markerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];
  zoom = 4;
  display?: google.maps.LatLngLiteral;
  drawingManager: google.maps.drawing.DrawingManager;
  subscription: Subscription;
  
  constructor(private route: ActivatedRoute, private router: Router, private backend: BackendService, private messageService: NzMessageService) { }

  ngOnInit(): void {
  }

  idleMap(event: any)  {
    if(this.mapLoaded)
      return;
    this.mapLoaded = true;
    this.route.data.subscribe(x => {
      this.model = x.item;
      if(this.model.id != null) {
        this.backend.getField('currency',this.fields).templateOptions.disabled = true;
      }
      if(this.model.location != null) {
        const latlngbounds = new google.maps.LatLngBounds();
        for (const poly of this.model.location) {
          for(const location of poly) {
            latlngbounds.extend(location);
          }
        }
        this.map.fitBounds(latlngbounds);
      }
    });
    this.drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      map:this.map._googleMap,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [google.maps.drawing.OverlayType.POLYGON]
      }
    });
    google.maps.event.addListener(this.drawingManager, 'overlaycomplete', (event) => {
      if (event.type === google.maps.drawing.OverlayType.POLYGON) {
        let ar = event.overlay.getPath().getArray();
        ar.push(ar[0]);
        if(this.model.location == null) {
          this.model.location = [ar];
        } else {
          this.model.location.push(ar);
        }
      }
    });
  }

  async onSubmit() {
    await this.backend.saveRow('Region', this.model, true, this.fields, ['location']);
      this.router.navigate(['management/regions'], {relativeTo: this.route.root});
  }

  clearMap() {
    this.model.location = [];
    this.model = JSON.parse(JSON.stringify(this.model));
  }
}
