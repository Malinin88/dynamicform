import { FORM_CONTROL_TYPE } from './ shared/constants/form-control-type';
import { Component } from '@angular/core';
import { IDynamicFieldConfig } from './ shared/interfaces/dynamic-field-config.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'dynamic-form';

  public config: IDynamicFieldConfig[] = [
    {
      type: FORM_CONTROL_TYPE.input,
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
    },
    {
      type: FORM_CONTROL_TYPE.select,
      label: 'Favourite food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
    },
    {
      label: 'Submit',
      name: 'submit',
      type: FORM_CONTROL_TYPE.button,
    },
  ];

  public formSubmitted(formValue: any): void {
    console.log(formValue);
  }
}
