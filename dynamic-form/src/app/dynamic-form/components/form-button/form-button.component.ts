import { Component, OnInit } from '@angular/core';
import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';
import { FormGroup } from '@angular/forms';
import { IDynamicField } from '../../interfaces/dynamic-field.interface';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements IDynamicField, OnInit {

  public config: IDynamicFieldConfig;

  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
