import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CodeBlockComponent } from './components/code-block/code-block.component';
import { PartiOnCanvasComponent } from './components/parti-on-canvas/parti-on-canvas.component';
import {FormsModule} from '@angular/forms';
import { LoadingBarComponent } from './components/loading-bar/loading-bar.component';


@NgModule({
  declarations: [CodeBlockComponent, PartiOnCanvasComponent, LoadingBarComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    CodeBlockComponent,
    PartiOnCanvasComponent,
    LoadingBarComponent
  ],
  providers: []
})
export class CommonModuleModule {
}
