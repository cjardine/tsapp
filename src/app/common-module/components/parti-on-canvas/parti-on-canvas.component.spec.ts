import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartiOnCanvasComponent } from './parti-on-canvas.component';

describe('PartiOnCanvasComponent', () => {
  let component: PartiOnCanvasComponent;
  let fixture: ComponentFixture<PartiOnCanvasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartiOnCanvasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartiOnCanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
