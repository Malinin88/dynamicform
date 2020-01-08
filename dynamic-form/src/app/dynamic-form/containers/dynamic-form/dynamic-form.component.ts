import { FormControlConfig } from './../../models/form-control-config';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() public config: FormControlConfig[];

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    const form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, this.fb.control(control.value, control.validators)));
    return group;
  }
}
