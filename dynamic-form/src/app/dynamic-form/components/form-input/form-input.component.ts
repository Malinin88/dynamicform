import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDynamicField } from '../../interfaces/dynamic-field.interface';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements IDynamicField, OnInit {

  public config: IDynamicFieldConfig;
  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
