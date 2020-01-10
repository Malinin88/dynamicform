import { Injectable } from '@angular/core';
import { CONTROL_DEPENDENCY_CONDITION } from '../constants/control-dependency-condition.enum';
import { FORM_DEPENDENCY_CONDITION } from '../constants/form-dependency-condition.enum';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LogicService {
  public isControlDependencyConditionSatisfied(
    condition: CONTROL_DEPENDENCY_CONDITION,
    controlValue: string | number,
    comparisonValue: string | number
  ): boolean {
    let result: boolean;

    switch (condition) {
      case CONTROL_DEPENDENCY_CONDITION.valueEquals:
        result = controlValue === comparisonValue;
        break;
      case CONTROL_DEPENDENCY_CONDITION.valueNotEquals:
        result = controlValue !== comparisonValue;
        break;
      default:
        throw new Error(`Uknown control dependency condition: ${condition}`);
    }

    return result;
  }

  public isFormDependencyConditionSatisfied(condition: FORM_DEPENDENCY_CONDITION, group: FormGroup): boolean {
    let result: boolean;

    switch (condition) {
      case FORM_DEPENDENCY_CONDITION.formInvalid:
        result = !group.valid;
        break;
      default:
        throw new Error(`Uknown form dependency condition: ${condition}`);
    }

    return result;
  }
}
