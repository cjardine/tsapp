import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomTypeRoutingModule } from './custom-type-routing.module';
import { CustomTypeComponent } from './custom-type.component';
import {CommonModuleModule} from '../../common-module/common-module.module';


@NgModule({
  declarations: [CustomTypeComponent],
    imports: [
        CommonModule,
        CustomTypeRoutingModule,
        CommonModuleModule
    ]
})
export class CustomTypeModule { }
