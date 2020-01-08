import { PageComponent } from './components/page/page.component';
import { IPageConfig } from './interfaces/page-config.interface';
import { FORM_CONTROL_TYPE } from './constants/form-control-type';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
          name: 'name',
          placeholder: 'Enter your name one',
        },
        {
          type: FORM_CONTROL_TYPE.select,
          label: 'Favourite food one',
          name: 'food',
          options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
          placeholder: 'Select an option',
        },
        {
          label: 'Submit one',
          name: 'submit',
          type: FORM_CONTROL_TYPE.button,
        },
      ]
    },
    {
      route: 'page-two',
      formConfig: [
        {
          type: FORM_CONTROL_TYPE.input,
          label: 'Full name two',
          name: 'name',
          placeholder: 'Enter your name two',
        },
        {
          type: FORM_CONTROL_TYPE.select,
          label: 'Favourite food two',
          name: 'food',
          options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
          placeholder: 'Select an option',
        },
        {
          label: 'Submit two',
          name: 'submit',
          type: FORM_CONTROL_TYPE.button,
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
