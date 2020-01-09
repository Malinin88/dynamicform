import { CONTROL_DEPENDENCY_CONDITION } from './../../constants/control-dependency-condition.enum';
import { IFieldRenderDependency } from './../../interfaces/field-render-dependency.interface';
import { IDynamicFieldConfig } from '../../interfaces/dynamic-field-config.interface';

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, AbstractControl, FormControl } from '@angular/forms';
import { DEPENDENCY_TYPE } from '../../constants/dependency-type.enum';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DEPENDENCY_TARGET_TYPE } from '../../constants/dependency-target-type.enum';
import { LogicService } from '../../services/logic.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  @Input() public config: IDynamicFieldConfig[];

  @Output() public submitted: EventEmitter<any> = new EventEmitter<any>();

  public form: FormGroup;

  private unsubscribeAll$: Subject<void> = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private logicSvc: LogicService
  ) { }

  public ngOnInit(): void {
    this.form = this.createGroup();
  }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next();
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
          this.applyDisableDependency(control, group, renderDependency);
          break;
        default:
          throw new Error(`No matching handler found for render dependency of type: ${renderDependency.type}`);
      }
    });
  }

  // Move methods to a utility?

  private applyDisableDependency(control: FormControl, group: FormGroup, renderDependency: IFieldRenderDependency) {
    if (renderDependency.targetType === DEPENDENCY_TARGET_TYPE.control) {
      if (!renderDependency.targetName) {
        throw new Error(`No target control name is provided for ${this.getControlName(control)} render dependency`);
      }

      const dependencyTargetControl = group.get(renderDependency.targetName);

      if (!dependencyTargetControl) {
        // tslint:disable-next-line: max-line-length
        throw new Error(`Could not find a dependency target with the name ${renderDependency.targetName} to apply a render dependency for ${this.getControlName(control)}`);
      }

      const setDisableStatus = testValue => {
        const disabled = this.logicSvc.isControlDependencyConditionSatisfied(
          renderDependency.condition as CONTROL_DEPENDENCY_CONDITION,
          testValue,
          renderDependency.comparisonValue
        );

        if (disabled) {
          control.disable();
        } else {
          control.enable();
        }
      };

      setDisableStatus(dependencyTargetControl.value);

      dependencyTargetControl.valueChanges
        .pipe(takeUntil(this.unsubscribeAll$))
        .subscribe(testValue => setDisableStatus(testValue));
    }
  }

  private getControlName(control: AbstractControl): string | null {
    const formGroup = control.parent.controls;
    return Object.keys(formGroup).find(name => control === formGroup[name]) || null;
  }
}
