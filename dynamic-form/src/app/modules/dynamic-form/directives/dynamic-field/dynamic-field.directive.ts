import { IDynamicField } from '../../interfaces/dynamic-field.interface';
import { IDynamicFieldConfig } from '../../../../interfaces/dynamic-field-config.interface';
import { Directive, OnInit, Input, ComponentFactoryResolver, ViewContainerRef, ComponentRef } from '@angular/core';

import { FormGroup } from '@angular/forms';

import { ComponentsMap } from './dynamic-field.constants';

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {

  @Input() public config: IDynamicFieldConfig;

  @Input() public group: FormGroup;

  public component: ComponentRef<IDynamicField>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  public ngOnInit(): void {
    const component = ComponentsMap[this.config.type];
    const componentFactory = this.resolver.resolveComponentFactory<IDynamicField>(component);
    this.component = this.container.createComponent(componentFactory);
    this.component.instance.config = this.config;
    this.component.instance.group = this.group;
  }

}
