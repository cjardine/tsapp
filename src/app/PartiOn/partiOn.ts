/*
 Welcome to PartiOn!
 ================================================================================================
 The most fun with particle emitters you'll (probably) ever have!

 */


/////////////////////////////////////////////////////////////////////////////////////////////////
// CONSTRUCTOR
/////////////////////////////////////////////////////////////////////////////////////////////////

import {Emitter, EmitterOptions} from './emitter';
import {fromEvent} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {throttle, throttleTime} from 'rxjs/operators';
import {Inject} from '@angular/core';


export enum ECanvasBlendModes {
  NORMAL = 'normal',
  MULTIPLY = 'multiply',
  SCREEN = 'screen',
  OVERLAY = 'overlay',
  DARKEN = 'darken',
  LIGHTEN = 'lighten',
  COLOR_DODGE = 'color-dodge',
  COLOR_BURN = 'color-burn',
  HARD_LIGHT = 'hard-light',
  SOFT_LIGHT = 'soft-light',
  DIFFERENCE = 'difference',
  EXCLUSION = 'exclusion',
  HUE = 'hue',
  SATURATION = 'saturation',
  COLOR = 'color',
  LUMINOSITY = 'luminosity',
  SOURCE_OVER = 'source-over',
  SOURCE_IN = 'source-in',
  SOURCE_OUT = 'source-out',
  SOURCE_ATOP = 'source-atop',
  DESTINATION_IN = 'destination-in',
  DESTINATION_OUT = 'destination-out',
  DESTINATION_ATOP = 'destination-atop',
  LIGHTER = 'lighter',
  COPY = 'copy',
  XOR = 'xor',
}


/**
 * PartiOn: The fun and easy particle library
 */
export class PartiOn {

  constructor(
    canvas: HTMLCanvasElement,
  ) {

    if (canvas) {
      this.setCanvas(canvas);
    }
  }

  static constants = {
    particle: {
      shapes: {
        SQUARE: 'SQUARE',
        CIRCLE: 'CIRCLE',
        TEARDROP: 'TEARDROP'
      },
      colorTypes: {
        SOLID: 'SOLID',
        GRADIENT: 'GRADIENT'
      },
      gradientTypes: {
        VERTICAL: 'VERTICAL',
        HORIZONTAL: 'HORIZONTAL',
        RADIAL: 'RADIAL'
      }
    },
    canvas: {
      blendModes: {
        NORMAL: 'normal',
        MULTIPLY: 'multiply',
        SCREEN: 'screen',
        OVERLAY: 'overlay',
        DARKEN: 'darken',
        LIGHTEN: 'lighten',
        COLOR_DODGE: 'color-dodge',
        COLOR_BURN: 'color-burn',
        HARD_LIGHT: 'hard-light',
        SOFT_LIGHT: 'soft-light',
        DIFFERENCE: 'difference',
        EXCLUSION: 'exclusion',
        HUE: 'hue',
        SATURATION: 'saturation',
        COLOR: 'color',
        LUMINOSITY: 'luminosity',
        SOURCE_OVER: 'source-over',
        SOURCE_IN: 'source-in',
        SOURCE_OUT: 'source-out',
        SOURCE_ATOP: 'source-atop',
        DESTINATION_IN: 'destination-in',
        DESTINATION_OUT: 'destination-out',
        DESTINATION_ATOP: 'destination-atop',
        LIGHTER: 'lighter',
        COPY: 'copy',
        XOR: 'xor'
      }
    },
    emitter: {}
  };

  canvas = null;
  showGenerator = false;
  canvasContext = null;
  emitters = [];
  active = true;
  dimensions = {
    height: 0,
    width: 0
  };
  debounceTimer = null;
  animationFrameId: number;

  setCanvas(canvas): void {
    if (canvas.nodeName === 'CANVAS') {
      this.canvas = canvas;
      this.canvasContext = this.canvas.getContext('2d');
    }
  }

  setBackgroundColor(color): void {
    if (this._checkCanvas()) {
      this.canvas.style.backgroundColor = color;
    }
  }

  setBlendMode(blendMode): void {
    if (this._checkCanvas()) {
      this.canvasContext.globalCompositeOperation = blendMode;
    }
  }


  addEmitter(options: EmitterOptions): void {
    let wasEmpty;
    if (this._checkCanvas()) {
      wasEmpty = (this.emitters.length === 0);
      this.emitters.push(new Emitter(options, this.canvas));
      if (wasEmpty && (this.emitters.length === 1)) {
        this._runLoop();
      }
    }
  }

  clearCanvas(): void {
    if (this._checkCanvas()) {
      this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }


  queue(): void {
    this.animationFrameId = window.requestAnimationFrame(() => {
      this._runLoop();
    });
  }

  destroy(): void {
    if (this.animationFrameId) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }


  private _checkCanvas(): boolean {
    if (this.canvas
      && this.canvasContext
      && this.canvas.constructor.name === 'HTMLCanvasElement'
      && this.canvasContext.constructor.name === 'CanvasRenderingContext2D') {
      return true;
    } else {
      console.error('No canvas or canvas context available. Use "setCanvas" with a valid canvas element, then add emitter.');
      return false;
    }
  }

  private _runLoop(): void {
    if (this.active) {
      this.clearCanvas();
      this._updateEmitters();
    }
    if (this.emitters.length > 0) {
      this.queue();
    }
  }

  private _updateEmitters(): void {
    this.emitters.forEach((currentEmitter, iteration) => {
      currentEmitter.update();
      this._drawParticles(currentEmitter);
    });
  }

  private _drawParticles(emitter: Emitter): void {
    let gradient;
    let r;
    let g;
    let b;
    let a;
    const nextColorRGBA = (color, theta) => {
      return [
        Math.round(color[0] + theta[0]),
        Math.round(color[1] + theta[1]),
        Math.round(color[2] + theta[2]),
        (color[3] + theta[3]),
      ];
    };
    emitter.pool.forEach((currentParticle, iteration) => {
      if (currentParticle.active) {
        currentParticle.speed = currentParticle.speed + currentParticle.speedTheta;

        currentParticle.position = {
          x: ((currentParticle.directions.x * currentParticle.speed) + currentParticle.position.x),
          y: ((currentParticle.directions.y * currentParticle.speed) + currentParticle.position.y)
        };

        currentParticle.size = Math.abs((currentParticle.size + currentParticle.sizeTheta));


        if (!(((currentParticle.directions.y + currentParticle.size / 2) < 0) ||
          ((currentParticle.directions.y - currentParticle.size / 2) > this.canvas.height) ||
          ((currentParticle.directions.x + currentParticle.size / 2) < 0) ||
          ((currentParticle.directions.x - currentParticle.size / 2) > this.canvas.width))) {
          this.canvasContext.beginPath();
          gradient = this.canvasContext.createRadialGradient(
            currentParticle.position.x,
            currentParticle.position.y,
            (currentParticle.size / 2),
            currentParticle.position.x,
            currentParticle.position.y,
            0);

          currentParticle.color1 = [r, g, b, a] = nextColorRGBA(currentParticle.color1, currentParticle.color1Theta);
          gradient.addColorStop(1, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');

          currentParticle.color2 = [r, g, b, a] = nextColorRGBA(currentParticle.color2, currentParticle.color2Theta);
          gradient.addColorStop(0, 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')');

          switch (emitter.options.shape) {
            case PartiOn.constants.particle.shapes.SQUARE:
              this.canvasContext.rect(currentParticle.position.x, currentParticle.position.y, currentParticle.size, currentParticle.size);
              break;
            case PartiOn.constants.particle.shapes.TEARDROP:
              this.canvasContext.beginPath();
              this.canvasContext.lineJoin = 'round';
              this.canvasContext.moveTo(currentParticle.position.x, currentParticle.position.y);
              this.canvasContext.quadraticCurveTo(
                currentParticle.position.x - (currentParticle.size / 4),
                currentParticle.position.y + currentParticle.size / 3,
                currentParticle.position.x + currentParticle.size,
                currentParticle.position.y + currentParticle.size
              );
              this.canvasContext.arc(
                currentParticle.position.x,
                currentParticle.position.y + currentParticle.size,
                (currentParticle.size / 2),
                0,
                2 * Math.PI,
                false
              );
              this.canvasContext.quadraticCurveTo(
                currentParticle.position.x - (currentParticle.size / 4),
                currentParticle.position.y + currentParticle.size / 2,
                currentParticle.position.x,
                currentParticle.position.y
              );
              break;
            case PartiOn.constants.particle.shapes.CIRCLE:
            // fall through
            default:
              this.canvasContext.arc(
                currentParticle.position.x,
                currentParticle.position.y,
                (currentParticle.size / 2),
                0,
                2 * Math.PI,
                false
              );
              break;
          }

          this.canvasContext.fillStyle = gradient;
          this.canvasContext.fill();
          this.canvasContext.closePath();
        }
      }
    });
  }
}




