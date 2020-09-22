import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTypeComponent } from './custom-type.component';

describe('CustomTypeComponent', () => {
  let component: CustomTypeComponent;
  let fixture: ComponentFixture<CustomTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
