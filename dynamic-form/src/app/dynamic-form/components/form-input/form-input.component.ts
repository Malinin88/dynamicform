import { FormControlConfig } from './../../models/form-control-config';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  public config: FormControlConfig;
  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
