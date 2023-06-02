import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosAboutComponent } from './preguntados-about.component';

describe('PreguntadosAboutComponent', () => {
  let component: PreguntadosAboutComponent;
  let fixture: ComponentFixture<PreguntadosAboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreguntadosAboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntadosAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
