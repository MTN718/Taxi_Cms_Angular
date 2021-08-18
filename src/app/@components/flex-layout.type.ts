
import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-form-flex',
  template: `
    <h3>{{to.title}}</h3>
    <div
      class="content" 
      [fxLayout]="to.fxLayout"
      fxLayout.xs="column" 
      fxFlexFill
      fxLayoutGap="10px"
    >
      <formly-field *ngFor="let f of field.fieldGroup" [field]="f">
      </formly-field>
    </div>
  `,
})
export class FlexLayoutType extends FieldType {
}