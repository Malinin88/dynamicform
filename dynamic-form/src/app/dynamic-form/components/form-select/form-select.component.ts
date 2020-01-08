import { IDynamicField } from './../../interfaces/dynamic-field.interface';
import { Component, OnInit } from '@angular/core';
import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements IDynamicField, OnInit {

  public config: IDynamicFieldConfig;

  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
