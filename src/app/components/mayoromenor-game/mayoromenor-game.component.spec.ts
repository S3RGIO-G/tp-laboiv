import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoromenorGameComponent } from './mayoromenor-game.component';

describe('MayoromenorGameComponent', () => {
  let component: MayoromenorGameComponent;
  let fixture: ComponentFixture<MayoromenorGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MayoromenorGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayoromenorGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
