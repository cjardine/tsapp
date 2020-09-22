import {Component, OnInit} from '@angular/core';
import {ECanvasBlendModes, PartiOn} from '../../PartiOn/partiOn';
import {EmitterOptions} from '../../PartiOn/emitter';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {
  blendMode = ECanvasBlendModes.NORMAL;
  blendModes = (() => {
    const modes = [];
    for (const value of Object.values(ECanvasBlendModes)) {
      modes.push(value);
    }
    return modes;
  })();


  emitter1 = ((): EmitterOptions => {
    return {
      name: 'bats',
      x: -25,
      y: -75,
      maxParticles: 200,
      emissionRate: 0.1,
      shape: PartiOn.constants.particle.shapes.CIRCLE,
      colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
      gradientType: PartiOn.constants.particle.gradientTypes.RADIAL,
      startColor1: [200, 200, 255, 0.5],
      startColor2: [200, 200, 255, 0],
      endColor1: [200, 200, 255, 0],
      endColor2: [200, 200, 255, 0],
      colorVariance: 5,
      startSize: 5,
      endSize: 2,
      startSizeVariance: 100,
      endSizeVariance: 300,
      startSpeed: 0.1,
      endSpeed: 0.5,
      startSpeedVariance: 50,
      endSpeedVariance: 100,
      direction: 45,
      directionVariance: 90,
      startDirectionVariance: 90,
      endDirectionVariance: 100,
      duration: 10,
      durationVariance: 50
    };
  })();
  emitter2 = ((): EmitterOptions => {
    return {
      name: 'bats',
      x: 0,
      y: -75,
      maxParticles: 200,
      emissionRate: 0.1,
      shape: PartiOn.constants.particle.shapes.CIRCLE,
      colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
      gradientType: PartiOn.constants.particle.gradientTypes.RADIAL,
      startColor1: [200, 200, 255, 0.5],
      startColor2: [200, 200, 255, 0],
      endColor1: [200, 200, 255, 0],
      endColor2: [200, 200, 255, 0],
      colorVariance: 5,
      startSize: 3,
      endSize: 1,
      startSizeVariance: 100,
      endSizeVariance: 300,
      startSpeed: 0.1,
      endSpeed: 0.5,
      startSpeedVariance: 20,
      endSpeedVariance: 50,
      direction: 90,
      directionVariance: 180,
      startDirectionVariance: 10,
      endDirectionVariance: 100,
      duration: 30,
      durationVariance: 50
    };
  })();
  emitter3 = ((): EmitterOptions => {
    return {
      name: 'bats',
      x: -50,
      y: -75,
      maxParticles: 500,
      emissionRate: 0.2,
      shape: PartiOn.constants.particle.shapes.CIRCLE,
      colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
      gradientType: PartiOn.constants.particle.gradientTypes.RADIAL,
      startColor1: [200, 200, 255, 0.3],
      startColor2: [200, 200, 255, 0],
      endColor1: [200, 200, 255, 0],
      endColor2: [200, 200, 255, 0],
      colorVariance: 2,
      startSize: 5,
      endSize: 2,
      startSizeVariance: 300,
      endSizeVariance: 300,
      startSpeed: 0.1,
      endSpeed: 2,
      startSpeedVariance: 20,
      endSpeedVariance: 50,
      direction: 20,
      directionVariance: 180,
      startDirectionVariance: 10,
      endDirectionVariance: 100,
      duration: 40,
      durationVariance: 50
    };
  })();
  emitter4 = ((): EmitterOptions => {
    return {
      name: 'bats',
      x: 0,
      y: -75,
      maxParticles: 300,
      emissionRate: 0.2,
      shape: PartiOn.constants.particle.shapes.CIRCLE,
      colorType: PartiOn.constants.particle.colorTypes.GRADIENT,
      gradientType: PartiOn.constants.particle.gradientTypes.RADIAL,
      startColor1: [50, 50, 120, 0.5],
      startColor2: [50, 50, 120, 0],
      endColor1: [50, 50, 120, 0],
      endColor2: [50, 50, 120, 0],
      colorVariance: 5,
      startSize: 5,
      endSize: 1,
      startSizeVariance: 100,
      endSizeVariance: 300,
      startSpeed: 0.1,
      endSpeed: 10,
      startSpeedVariance: 20,
      endSpeedVariance: 50,
      direction: 45,
      directionVariance: 90,
      startDirectionVariance: 50,
      endDirectionVariance: 200,
      duration: 20,
      durationVariance: 50
    };
  })();

  constructor() {
  }

  ngOnInit(): void {
  }

}
