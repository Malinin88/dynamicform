import { DEPENDENCY_TYPE } from './modules/dynamic-form/constants/dependency-type.enum';
import { PageComponent } from './modules/content/components/page/page.component';
import { IPageConfig } from './modules/content/interfaces/page-config.interface';
import { FORM_CONTROL_TYPE } from './modules/dynamic-form/constants/form-control-type.enum';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEPENDENCY_TARGET_TYPE } from './modules/dynamic-form/constants/dependency-target-type.enum';
import { CONTROL_DEPENDENCY_CONDITION } from './modules/dynamic-form/constants/control-dependency-condition.enum';
import { COMPARISON_TARGET } from './modules/dynamic-form/constants/comparison-target.enum';
import { Validators } from '@angular/forms';
import { FORM_DEPENDENCY_CONDITION } from './modules/dynamic-form/constants/form-dependency-condition.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title = 'dynamic-form';

  public pages: IPageConfig[] = [
    {
      route: 'page-one',
      formConfig: [
        {
          type: FORM_CONTROL_TYPE.input,
          label: 'Full name one',
          controlName: 'nameOne',
          placeholder: 'Enter your name one',
          validators: [Validators.required],
          visible: true,
          renderDependencies: [
            {
              type: DEPENDENCY_TYPE.disable,
              targetType: DEPENDENCY_TARGET_TYPE.control,
              targetName: 'foodOne',
              condition: CONTROL_DEPENDENCY_CONDITION.valueEquals,
              comparisonTarget: COMPARISON_TARGET.string,
              comparisonValue: 'Coffee'
            },
            {
              type: DEPENDENCY_TYPE.display,
              targetType: DEPENDENCY_TARGET_TYPE.control,
              targetName: 'foodOne',
              condition: CONTROL_DEPENDENCY_CONDITION.valueNotEquals,
              comparisonTarget: COMPARISON_TARGET.string,
              comparisonValue: 'Pizza'
            }
          ]
        },
        {
          type: FORM_CONTROL_TYPE.select,
          label: 'Favourite food one',
          controlName: 'foodOne',
          options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
          placeholder: 'Select an option',
          validators: [Validators.required],
          visible: true,
        },
        {
          type: FORM_CONTROL_TYPE.group,
          controlName: 'nestedFormOne',
          visible: true,
          nestedFormConfig: [
            {
              type: FORM_CONTROL_TYPE.input,
              label: 'Full name three',
              controlName: 'nameThree',
              placeholder: 'Enter your name three',
              validators: [Validators.required],
              visible: true
            },
            {
              type: FORM_CONTROL_TYPE.select,
              label: 'Favourite food three',
              controlName: 'foodThree',
              options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
              placeholder: 'Select an option three',
              validators: [Validators.required],
              visible: true
            },
            {
              type: FORM_CONTROL_TYPE.group,
              controlName: 'nestedFormFour',
              visible: true,
              nestedFormConfig: [
                {
                  type: FORM_CONTROL_TYPE.input,
                  label: 'Full name four',
                  controlName: 'nameFour',
                  placeholder: 'Enter your name four',
                  validators: [Validators.required],
                  visible: true
                },
                {
                  type: FORM_CONTROL_TYPE.select,
                  label: 'Favourite food four',
                  controlName: 'foodFour',
                  options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
                  placeholder: 'Select an option four',
                  validators: [Validators.required],
                  visible: true
                }
              ]
            }
          ]
        },
        {
          label: 'Submit one',
          controlName: 'submitOne',
          type: FORM_CONTROL_TYPE.button,
          visible: true,
          renderDependencies: [
            {
              type: DEPENDENCY_TYPE.disable,
              targetType: DEPENDENCY_TARGET_TYPE.form,
              targetName: 'form',
              condition: FORM_DEPENDENCY_CONDITION.formInvalid
            }
          ]
        }
      ]
    },
    {
      route: 'page-two',
      formConfig: [
        {
          type: FORM_CONTROL_TYPE.input,
          label: 'Full name two',
          controlName: 'nameTwo',
          placeholder: 'Enter your name two',
          visible: true
        },
        {
          type: FORM_CONTROL_TYPE.select,
          label: 'Favourite food two',
          controlName: 'foodTwo',
          options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
          placeholder: 'Select an option',
          visible: true
        },
        {
          label: 'Submit two',
          controlName: 'submitTwo',
          type: FORM_CONTROL_TYPE.button,
          visible: true
        },
      ]
    }
  ];

  constructor(private router: Router) { }

  public ngOnInit(): void {
    this.pages.forEach(pageConfig => {
      this.router.config.push({
        path: pageConfig.route,
        component: PageComponent,
        data: {
          formConfig: pageConfig.formConfig
        }
      });
    });

    this.router.config.push({
      path: '**',
      redirectTo: this.pages[0].route,
      data: {
        formConfig: this.pages[0].formConfig
      },
      pathMatch: 'full'
    });
  }
}
