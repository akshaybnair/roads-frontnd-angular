import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsoleMapComponent } from './console-map.component';

describe('ConsoleMapComponent', () => {
  let component: ConsoleMapComponent;
  let fixture: ComponentFixture<ConsoleMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsoleMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsoleMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
