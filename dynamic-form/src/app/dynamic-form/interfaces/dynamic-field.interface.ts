
import { IDynamicFieldConfig } from '../../ shared/interfaces/dynamic-field-config.interface';

import { FormGroup } from '@angular/forms';

export interface IDynamicField {

  config: IDynamicFieldConfig;

  group: FormGroup;

}
