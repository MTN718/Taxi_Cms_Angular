import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PromotionsRoutingModule } from './promotions-routing.module';
import { PromotionsListComponent } from './promotions-list/promotions-list.component';
import { PromotionViewComponent } from './promotion-view/promotion-view.component';
import { SharedModule } from 'src/app/@components/shared.module';


@NgModule({
  declarations: [PromotionsListComponent, PromotionViewComponent],
  imports: [
    CommonModule,
    PromotionsRoutingModule,
    SharedModule
  ]
})
export class PromotionsModule { }
