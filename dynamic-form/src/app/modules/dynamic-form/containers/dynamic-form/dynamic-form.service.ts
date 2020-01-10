import { FORM_DEPENDENCY_CONDITION } from './../../constants/form-dependency-condition.enum';
import { IFieldRenderDependency } from './../../interfaces/field-render-dependency.interface';
import { IDynamicFieldConfig } from './../../interfaces/dynamic-field-config.interface';
import { takeUntil } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';
import { LogicService } from '../../services/logic.service';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { DEPENDENCY_TARGET_TYPE } from '../../constants/dependency-target-type.enum';
import { CONTROL_DEPENDENCY_CONDITION } from '../../constants/control-dependency-condition.enum';
import { Subject } from 'rxjs';
import { FORM_CONTROL_TYPE } from '../../constants/form-control-type.enum';

@Injectable()
export class DynamicFormService implements OnDestroy {

  private unsubscribeAll$: Subject<void> = new Subject<void>();

  constructor(private logicSvc: LogicService) { }

  public ngOnDestroy(): void {
    this.unsubscribeAll$.next();
  }

  public applyDisableDependency(
    control: FormControl,
    fieldConfig: IDynamicFieldConfig,
    group: FormGroup,
    renderDependency: IFieldRenderDependency): void {
    if (renderDependency.targetType === DEPENDENCY_TARGET_TYPE.control) {
      if (!renderDependency.targetName) {
        throw new Error(`No target control name is provided for ${this.getControlName(control)} render dependency`);
      }

      const dependencyTargetControl = group.get(renderDependency.targetName);

      if (!dependencyTargetControl) {
        // tslint:disable-next-line: max-line-length
        throw new Error(`Could not find a dependency target with the name ${renderDependency.targetName} to apply a render dependency for ${this.getControlName(control)}`);
      }

      const toggleDisabled = testValue => {
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

      toggleDisabled(dependencyTargetControl.value);

      dependencyTargetControl.valueChanges
        .pipe(takeUntil(this.unsubscribeAll$))
        .subscribe(testValue => toggleDisabled(testValue));
    }

    if (renderDependency.targetType === DEPENDENCY_TARGET_TYPE.form && fieldConfig.type === FORM_CONTROL_TYPE.button) {
      const toggleDisabled = (formGroup: FormGroup) => {
        const disabled = this.logicSvc.isFormDependencyConditionSatisfied(
          renderDependency.condition as FORM_DEPENDENCY_CONDITION,
          formGroup
        );

        if (disabled) {
          fieldConfig.disabled = true;
        } else {
          fieldConfig.disabled = false;
        }
      };

      toggleDisabled(group);

      group.statusChanges
        .pipe(takeUntil(this.unsubscribeAll$))
        .subscribe(() => toggleDisabled(group));
    }
  }

  public applyDisplayDependency(
    control: FormControl,
    fieldConfig: IDynamicFieldConfig,
    group: FormGroup,
    renderDependency: IFieldRenderDependency,
  ): void {
    if (renderDependency.targetType === DEPENDENCY_TARGET_TYPE.control) {
      if (!renderDependency.targetName) {
        throw new Error(`No target control name is provided for ${this.getControlName(control)} render dependency`);
      }

      const dependencyTargetControl = group.get(renderDependency.targetName);

      if (!dependencyTargetControl) {
        // tslint:disable-next-line: max-line-length
        throw new Error(`Could not find a dependency target with the name ${renderDependency.targetName} to apply a render dependency for ${this.getControlName(control)}`);
      }

      const toggleDisplay = testValue => {
        const display = this.logicSvc.isControlDependencyConditionSatisfied(
          renderDependency.condition as CONTROL_DEPENDENCY_CONDITION,
          testValue,
          renderDependency.comparisonValue
        );

        if (display) {
          control.setValidators(fieldConfig.validators);
          control.updateValueAndValidity();
          fieldConfig.visible = true;
        } else {
          control.clearValidators();
          control.updateValueAndValidity();
          fieldConfig.visible = false;
        }
      };

      toggleDisplay(dependencyTargetControl.value);

      dependencyTargetControl.valueChanges
        .pipe(takeUntil(this.unsubscribeAll$))
        .subscribe(testValue => toggleDisplay(testValue));
    }
  }

  private getControlName(control: AbstractControl): string | null {
    const formGroup = control.parent.controls;
    return Object.keys(formGroup).find(name => control === formGroup[name]) || null;
  }
}
