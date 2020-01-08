import { Component, OnInit } from '@angular/core';
import { FormControlConfig } from '../../models/form-control-config';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-button',
  templateUrl: './form-button.component.html',
  styleUrls: ['./form-button.component.scss']
})
export class FormButtonComponent implements OnInit {

  public config: FormControlConfig;

  public group: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
