import { IFieldRenderDependency } from './../../interfaces/field-render-dependency.interface';
import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { DEPENDENCY_TYPE } from '../../constants/dependency-type.enum';
import { DynamicFormService } from './dynamic-form.service';

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

  @Output() public submitted: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dynamicFormSvs: DynamicFormService
  ) { }

  public ngOnInit(): void {
    this.form = this.createGroup();
  }

  private createGroup(): FormGroup {
    const group = this.fb.group({});

    this.config.forEach(controlConfig => {
      group.addControl(controlConfig.controlName, this.fb.control(controlConfig.value, controlConfig.validators));
    });

    this.config.forEach(controlConfig => {
      const control = group.get(controlConfig.controlName) as FormControl;
      this.applyRenderDepsForControl(control, group, controlConfig.renderDependencies);
    });

    return group;
  }

  private applyRenderDepsForControl(
    control: FormControl,
    group: FormGroup,
    controlRenderDeps: IFieldRenderDependency[]
  ): void {
    if (!controlRenderDeps || controlRenderDeps.length === 0) {
      return;
    }

    controlRenderDeps.forEach(renderDependency => {
      switch (renderDependency.type) {
        case DEPENDENCY_TYPE.disable:
          this.dynamicFormSvs.applyDisableDependency(control, group, renderDependency);
          break;
        default:
          throw new Error(`No matching handler found for render dependency of type: ${renderDependency.type}`);
      }
    });
  }
}
