import { IDynamicFieldConfig } from './../../interfaces/dynamic-field-config.interface';
import { IFieldRenderDependency } from './../../interfaces/field-render-dependency.interface';

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DEPENDENCY_TYPE } from '../../constants/dependency-type.enum';
import { DynamicFormService } from './dynamic-form.service';
import { FORM_CONTROL_TYPE } from '../../constants/form-control-type.enum';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [
    DynamicFormService
  ]
})
export class DynamicFormComponent implements OnInit {
  @Input() public config: IDynamicFieldConfig[];

  @Input() form: FormGroup;

  @Output() public submitted: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private dynamicFormSvs: DynamicFormService
  ) { }

  public ngOnInit(): void {
    if (!this.form) {
      this.form = this.createGroup();
    } else {
      this.populateGroup(this.form, this.config);
    }
  }

  private createGroup(): FormGroup {
    let group = this.fb.group({});
    group = this.populateGroup(group, this.config);

    this.config.forEach(fieldConfig => {
      const control = group.get(fieldConfig.controlName) as FormControl;
      this.applyRenderDepsForControl(control, fieldConfig, group, fieldConfig.renderDependencies);
    });

    return group;
  }

  private populateGroup(group: FormGroup, formConfig: IDynamicFieldConfig[]): FormGroup {
    formConfig.forEach(fieldConfig => {
      switch (fieldConfig.type) {
        case FORM_CONTROL_TYPE.button:
          break;
        case FORM_CONTROL_TYPE.input:
        case FORM_CONTROL_TYPE.select:
          group.addControl(fieldConfig.controlName, this.fb.control(fieldConfig.value, fieldConfig.validators));
          break;
        case FORM_CONTROL_TYPE.group:
          // Add the nested form and recursively add the nested in that one
          let subGroup = this.fb.group({});
          subGroup = this.populateGroup(subGroup, fieldConfig.nestedFormConfig);
          group.addControl(fieldConfig.controlName, subGroup);
          break;
        default:
          throw new Error(`Unknown dynamic field type: ${fieldConfig.type}`);
      }
    });

    return group;
  }

  private applyRenderDepsForControl(
    control: FormControl,
    fieldConfig: IDynamicFieldConfig,
    group: FormGroup,
    controlRenderDeps: IFieldRenderDependency[]
  ): void {
    if (!controlRenderDeps || controlRenderDeps.length === 0) {
      return;
    }

    controlRenderDeps.forEach(renderDependency => {
      switch (renderDependency.type) {
        case DEPENDENCY_TYPE.disable:
          this.dynamicFormSvs.applyDisableDependency(control, fieldConfig, group, renderDependency);
          break;
        case DEPENDENCY_TYPE.display:
          this.dynamicFormSvs.applyDisplayDependency(control, fieldConfig, group, renderDependency);
          break;
        default:
          throw new Error(`No matching handler found for render dependency of type: ${renderDependency.type}`);
      }
    });
  }
}
