import { FORM_CONTROL_TYPE } from './../constants/form-control-type';
import { ValidatorFn } from '@angular/forms';
import { FORM_CONTROL_NAME } from '../constants/form-control-name';

export interface FormControlConfig {

  type: FORM_CONTROL_TYPE;

  label?: string;

  name: FORM_CONTROL_NAME;

  placeholder?: string;

  value?: any;

  options?: string[];

  validators?: ValidatorFn | ValidatorFn[];

}
