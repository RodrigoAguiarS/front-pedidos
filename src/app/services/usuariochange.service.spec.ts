import { TestBed } from '@angular/core/testing';

import { UsuariochangeService } from './usuariochange.service';

describe('UsuariochangeService', () => {
  let service: UsuariochangeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariochangeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
