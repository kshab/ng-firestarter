import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MaterialModule} from './material/material.module';
import {LayoutModule} from '@angular/cdk/layout';

import { ShellComponent } from './shell/shell.component';
import {RouterModule} from '@angular/router';

const components = [
  ShellComponent
];

const modules = [
  CommonModule,
  MaterialModule,
  LayoutModule,
  RouterModule
];

@NgModule({
  declarations: [...components],
  imports: [...modules],
  exports: [
    ...components,
    ...modules,
  ]
})
export class SharedModule {}
