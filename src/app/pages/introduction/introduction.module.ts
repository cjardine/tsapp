import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntroductionRoutingModule } from './introduction-routing.module';
import { IntroductionComponent } from './introduction.component';
import {CommonModuleModule} from '../../common-module/common-module.module';


@NgModule({
  declarations: [IntroductionComponent],
    imports: [
        CommonModule,
        IntroductionRoutingModule,
        CommonModuleModule
    ]
})
export class IntroductionModule { }
