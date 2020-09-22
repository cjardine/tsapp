import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  Input, OnChanges,
  OnDestroy,
  OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import {PartiOnHTMLCanvasElement} from '../../../PartiOn/CanvasElement';
import {ECanvasBlendModes, PartiOn} from '../../../PartiOn/partiOn';
import {EmitterOptions} from '../../../PartiOn/emitter';
import {fromEvent, Subscription} from 'rxjs';
import {throttleTime} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {WindowService} from '../../../services/window.service';

@Component({
  selector: 'app-parti-on-canvas',
  templateUrl: './parti-on-canvas.component.html',
  styleUrls: ['./parti-on-canvas.component.scss']
})
export class PartiOnCanvasComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('canvasElement') canvasElement;
  @Input() options: EmitterOptions[];
  @Input() blendMode: ECanvasBlendModes = ECanvasBlendModes.NORMAL;
  canvas: PartiOnHTMLCanvasElement;
  resizeSubscription: Subscription;
  parent: HTMLDivElement;
  width: number;
  height: number;


  constructor(
    private elRef: ElementRef,
    private windowService: WindowService,
  ) {
    this.parent = elRef.nativeElement.parentNode;
  }

  resizeCanvas(): void {
    const parentComputedStyle = getComputedStyle(this.elRef.nativeElement);
    this.width = parseInt(parentComputedStyle.width, 10);
    this.height = parseInt(parentComputedStyle.height, 10);
    console.log(`this.height: ${this.height}`);
    console.log(`this.width: ${this.width}`);
    if (this.canvas) {
      // this.canvas.width = parseInt(parentComputedStyle.width, 10);
      // this.canvas.height = parseInt(parentComputedStyle.height, 10);
      // const parentBoundingRect = this.parent.getBoundingClientRect();
      // this.canvas.width = parentBoundingRect.width;
      // this.canvas.height = parentBoundingRect.height;
    }
  }

  setBlendMode(blendMode): void {
    if (this.canvas) {
      this.canvas.party.setBlendMode(blendMode);
    }
  }

  ngOnInit(): void {
    console.log(this.options);
    const resize = fromEvent(this.windowService.window, 'resize')
      .pipe(
        throttleTime(500)
      );
    this.resizeSubscription = resize
      .subscribe((event) => {
        this.resizeCanvas();
      });
  }

  ngOnDestroy(): void {
    this.resizeSubscription.unsubscribe();
    this.canvas.party.destroy();
  }

  ngAfterContentInit(): void {
    this.resizeCanvas();
  }

  ngAfterViewInit(): void {
    // this.canvas = this.canvasElement.nativeElement;
    // const image = new Image(200, 200);
    // image.src = 'assets/images/ts-logo-round-128.svg';
    // const ctx = this.canvas.getContext('2d');
    // ctx.drawImage(image, 10, 10);
    if (!this.canvas) {
      this.canvas = this.canvasElement.nativeElement;
      this.canvas.party = new PartiOn(this.canvas);
      this.options.forEach((options) => {
        this.canvas.party.addEmitter(options);
      });
      this.canvas.party.setBackgroundColor('rgba(0,0,0,0)');
      this.canvas.party.setBlendMode(PartiOn.constants.canvas.blendModes.COLOR_DODGE);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.blendMode) {
      console.log(`blendMode changed: ${changes.blendMode.currentValue}`);
      this.setBlendMode(changes.blendMode.currentValue);
    }
  }
}
