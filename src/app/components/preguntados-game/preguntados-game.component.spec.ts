import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreguntadosGameComponent } from './preguntados-game.component';

describe('PreguntadosGameComponent', () => {
  let component: PreguntadosGameComponent;
  let fixture: ComponentFixture<PreguntadosGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PreguntadosGameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreguntadosGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
