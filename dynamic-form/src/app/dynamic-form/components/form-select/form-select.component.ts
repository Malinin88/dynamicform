import { Component, OnInit } from '@angular/core';
import { FormControlConfig } from '../../models/form-control-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit {

  public config: FormControlConfig;

  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
