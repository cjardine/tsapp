/**
 * Created by Chris on 2015-12-18.
 */


export class Particle {
  active = false;
  steps = 0;
  step = 0;
  position = {x: 0, y: 0};
  size = 0;
  sizeTheta = 0;
  speed = 0;
  speedTheta = 0;
  directions = {};
  color1 = [];
  color2 = [];
  color1Theta = [];
  color2Theta = [];

  constructor() {
  }

  reset(): void {
    this.active = false;
    this.steps = 0;
    this.step = 0;
    this.position = {x: 0, y: 0};
    this.size = 0;
    this.sizeTheta = 0;
    this.speed = 0;
    this.speedTheta = 0;
    this.directions = {};
    this.color1.length = 0;
    this.color2.length = 0;
    this.color1Theta.length = 0;
    this.color2Theta.length = 0;

  }

  update(): void {
    if (this.active) {
      this.step = this.step + 1;
      if (this.step === this.steps) {
        this.reset();
      }
    }
  }
}
