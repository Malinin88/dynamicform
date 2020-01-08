import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() public config: IDynamicFieldConfig[];

  @Output() public submitted: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.form = this.createGroup();
  }

  createGroup() {
    const group = this.fb.group({});
    this.config.forEach(control => group.addControl(control.name, this.fb.control(control.value, control.validators)));
    return group;
  }
}
