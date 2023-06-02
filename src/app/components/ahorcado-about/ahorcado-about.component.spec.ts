import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorcadoAboutComponent } from './ahorcado-about.component';

describe('AhorcadoAboutComponent', () => {
  let component: AhorcadoAboutComponent;
  let fixture: ComponentFixture<AhorcadoAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AhorcadoAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AhorcadoAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
