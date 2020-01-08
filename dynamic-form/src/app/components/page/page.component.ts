import { IDynamicFieldConfig } from './../../interfaces/dynamic-field-config.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit, OnDestroy {

  public config: IDynamicFieldConfig[];

  private routerDateSubscription: Subscription;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.routerDateSubscription = this.route.data.subscribe(data => {
      if (!data.formConfig) {
        throw new Error('No form configuration provided for the page component');
      }

      this.config = data.formConfig;
    });
  }

  public ngOnDestroy(): void {
    this.routerDateSubscription.unsubscribe();
  }

  public formSubmitted(formValue: any): void {
    console.log(formValue);
  }
}
