import { FORM_CONTROL_TYPE } from '../constants/form-control-type';
import { ValidatorFn } from '@angular/forms';

export interface IDynamicFieldConfig {

  type: FORM_CONTROL_TYPE;

  label?: string;

  name: string;

  placeholder?: string;

  value?: any;

  options?: string[];

  validators?: ValidatorFn | ValidatorFn[];

}
