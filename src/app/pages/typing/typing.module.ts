import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TypingRoutingModule} from './typing-routing.module';
import {TypingComponent} from './typing.component';
import {CommonModuleModule} from '../../common-module/common-module.module';


@NgModule({
  declarations: [TypingComponent],
  imports: [
    CommonModule,
    TypingRoutingModule,
    CommonModuleModule,
  ]
})
export class TypingModule {
}
