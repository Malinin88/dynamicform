import { Injectable } from '@angular/core';
import { CONTROL_DEPENDENCY_CONDITION } from '../constants/control-dependency-condition.enum';

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
        throw new Error(`Uknown control render dependency condition: ${condition}`);
    }

    return result;
  }
}
