import { FORM_DEPENDENCY_CONDITION } from './../constants/form-dependency-condition.enum';
import { COMPARISON_TARGET } from '../constants/comparison-target.enum';
import { DEPENDENCY_TYPE } from '../constants/dependency-type.enum';
import { DEPENDENCY_TARGET_TYPE } from '../constants/dependency-target-type.enum';
import { CONTROL_DEPENDENCY_CONDITION } from '../constants/control-dependency-condition.enum';

export interface IFieldRenderDependency {

  type: DEPENDENCY_TYPE;

  targetType: DEPENDENCY_TARGET_TYPE;

  targetName: string;

  condition: FORM_DEPENDENCY_CONDITION | CONTROL_DEPENDENCY_CONDITION;

  comparisonTarget?: COMPARISON_TARGET;

  comparisonTargetName?: string;

  comparisonValue?: number | string;

}
