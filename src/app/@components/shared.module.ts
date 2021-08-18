import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule, NzInputModule, NzDropDownModule, NzTabBodyComponent, NzButtonModule, NzIconModule, NzLayoutModule, NzFormModule, NzSelectModule, NzRadioModule, NzDatePickerModule, NzTimePickerModule, NzInputNumberModule, NzCheckboxModule, NzDividerModule, NzTabsModule, NzTagModule, NzPageHeaderModule, NzStatisticModule, NzDescriptionsModule, NzUploadModule, NzTransferModule, NzBadgeModule, NzCommentModule, NzAvatarModule, NzEmptyModule, NzTimelineModule, NzCardModule, NzPopconfirmModule, NzStepsModule, NzPopoverModule, NzNotificationService, NzMessageService, NzGridModule, NzSwitchModule, NzPaginationModule, NzToolTipModule, NzRateModule } from 'ng-zorro-antd';
import { IconsProviderModule } from '../icons-provider.module';
import { HttpClientModule } from '@angular/common/http';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyNgZorroAntdModule } from '@ngx-formly/ng-zorro-antd';
import { GoogleMapsModule } from '@angular/google-maps';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { TableResolver } from '../@resolvers/table.resolver';
import { ItemResolver } from '../@resolvers/item.resolver';
import { TagColorService } from '../@services/tag-color/tag-color.service';
import { PhonePipe } from '../@pipes/phone.pipe';
import { TranslateModule } from '@ngx-translate/core';

const modules = [

]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTableModule,
        NzInputModule,
        NzDropDownModule,
        NzButtonModule,
        NzIconModule,
        NzFormModule,
        NzSelectModule,
        NzRadioModule,
        NzDividerModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzTabsModule,
        NzTagModule,
        NzPageHeaderModule,
        NzStatisticModule,
        NzDescriptionsModule,
        NzUploadModule,
        NzTransferModule,
        NzBadgeModule,
        NzCommentModule,
        NzAvatarModule,
        NzEmptyModule,
        NzTimelineModule,
        NzCardModule,
        NzPopconfirmModule,
        NzPopoverModule,
        NzStepsModule,
        NzInputNumberModule,
        NzCheckboxModule,
        IconsProviderModule,
        HttpClientModule,
        NzLayoutModule,
        NzGridModule,
        FormlyNgZorroAntdModule,
        FormlyModule,
        GoogleMapsModule,
        ChartjsModule,
        NzSwitchModule,
        NzPaginationModule,
        NzRateModule,
        TranslateModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NzTableModule,
        NzInputModule,
        NzDropDownModule,
        NzButtonModule,
        NzIconModule,
        NzFormModule,
        NzSelectModule,
        NzRadioModule,
        NzDividerModule,
        NzDatePickerModule,
        NzTimePickerModule,
        NzTabsModule,
        NzTagModule,
        NzPageHeaderModule,
        NzStatisticModule,
        NzDescriptionsModule,
        NzUploadModule,
        NzTransferModule,
        NzBadgeModule,
        NzCommentModule,
        NzAvatarModule,
        NzEmptyModule,
        NzTimelineModule,
        NzCardModule,
        NzPopconfirmModule,
        NzPopoverModule,
        NzStepsModule,
        NzInputNumberModule,
        NzCheckboxModule,
        IconsProviderModule,
        HttpClientModule,
        NzLayoutModule,
        NzGridModule,
        FormlyNgZorroAntdModule,
        FormlyModule,
        GoogleMapsModule,
        ChartjsModule,
        NzSwitchModule,
        PhonePipe,
        NzPaginationModule,
        NzToolTipModule,
        NzRateModule,
        TranslateModule
    ],
    declarations: [PhonePipe],
    providers: [NzNotificationService, NzMessageService, TagColorService, TableResolver, ItemResolver]
})
export class SharedModule { }