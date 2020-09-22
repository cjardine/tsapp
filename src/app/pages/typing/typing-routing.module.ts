import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TypingComponent } from './typing.component';

const routes: Routes = [{ path: '', component: TypingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypingRoutingModule { }
