import { FormGroup } from '@angular/forms';
import { IDynamicFieldConfig } from './../../interfaces/dynamic-field-config.interface';
import { IDynamicField } from './../../interfaces/dynamic-field.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements IDynamicField, OnInit {

  public config: IDynamicFieldConfig;

  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
