import { IFieldRenderDependency } from './field-render-dependency.interface';
import { FORM_CONTROL_TYPE } from '../constants/form-control-type.enum';
import { ValidatorFn } from '@angular/forms';

export interface IDynamicFieldConfig {

  type: FORM_CONTROL_TYPE;

  label?: string;

  controlName: string;

  placeholder?: string;

  value?: any;

  options?: string[];

  validators?: ValidatorFn | ValidatorFn[];

  renderDependencies?: IFieldRenderDependency[];

  // All controls
  visible: boolean;

  // Buttons only
  disabled?: boolean;

  nestedFormConfig?: IDynamicFieldConfig[];

}
