import { DynamicFormModule } from './modules/dynamic-form/dynamic-form.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './components/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DynamicFormModule
  ],
  entryComponents: [
    PageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
