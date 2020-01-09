
import { NgModule } from '@angular/core';
import { PageComponent } from './components/page/page.component';
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';

@NgModule({
  declarations: [
    PageComponent
  ],
  imports: [
    DynamicFormModule
  ],
  entryComponents: [
    PageComponent
  ]
})
export class ContentModule { }
