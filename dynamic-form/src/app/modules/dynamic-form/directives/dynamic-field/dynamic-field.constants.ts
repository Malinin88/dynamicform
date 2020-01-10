import { FormGroupComponent } from './../../components/form-group/form-group.component';
import { FORM_CONTROL_TYPE } from '../../constants/form-control-type.enum';
import { FormButtonComponent } from '../../components/form-button/form-button.component';
import { FormInputComponent } from '../../components/form-input/form-input.component';
import { FormSelectComponent } from '../../components/form-select/form-select.component';


export const ComponentsMap = {
  [FORM_CONTROL_TYPE.button]: FormButtonComponent,
  [FORM_CONTROL_TYPE.input]: FormInputComponent,
  [FORM_CONTROL_TYPE.select]: FormSelectComponent,
  [FORM_CONTROL_TYPE.group]: FormGroupComponent
};
