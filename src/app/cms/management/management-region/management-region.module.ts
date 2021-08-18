import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagementRegionRoutingModule } from './management-region-routing.module';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionViewComponent } from './region-view/region-view.component';
import { TagColorService } from 'src/app/@services/tag-color/tag-color.service';
import { SharedModule } from 'src/app/@components/shared.module';

@NgModule({
  declarations: [RegionListComponent, RegionViewComponent],
  imports: [
    CommonModule,
    ManagementRegionRoutingModule,
    SharedModule
  ],
  providers: [TagColorService]
})
export class ManagementRegionModule { }
