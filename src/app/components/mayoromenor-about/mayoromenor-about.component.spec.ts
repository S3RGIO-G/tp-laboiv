import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MayoromenorAboutComponent } from './mayoromenor-about.component';

describe('MayoromenorAboutComponent', () => {
  let component: MayoromenorAboutComponent;
  let fixture: ComponentFixture<MayoromenorAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ MayoromenorAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MayoromenorAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
