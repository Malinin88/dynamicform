import { IDynamicFieldConfig } from '../../../../shared/interfaces/dynamic-field-config.interface';
import { IDynamicField } from '../../interfaces/dynamic-field.interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
