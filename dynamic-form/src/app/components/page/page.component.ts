import { IDynamicFieldConfig } from './../../interfaces/dynamic-field-config.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  public config: IDynamicFieldConfig[];

  constructor() { }

  ngOnInit() {
    // todo: retrieve the config from route data
  }

  public formSubmitted(formValue: any): void {
    console.log(formValue);
  }
}
