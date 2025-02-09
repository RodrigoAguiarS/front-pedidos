import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioResultComponent } from './usuario-result.component';

describe('UsuarioResultComponent', () => {
  let component: UsuarioResultComponent;
  let fixture: ComponentFixture<UsuarioResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
