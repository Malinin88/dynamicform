import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from './containers/dynamic-form/dynamic-form.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { FormButtonComponent } from './components/form-button/form-button.component';
import { FormSelectComponent } from './components/form-select/form-select.component';
import { DynamicFieldDirective } from './directives/dynamic-field/dynamic-field.directive';



@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldDirective,
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent,
  ],
  entryComponents: [
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
