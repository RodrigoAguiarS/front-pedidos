import { Injectable } from '@angular/core';
import { EnderecoResposta } from '../model/EnderecoResposta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(private readonly http: HttpClient) {}

  buscaEnderecoPorCep(cep: string): Observable<EnderecoResposta> {
    return this.http.get<EnderecoResposta>(
      `https://viacep.com.br/ws/${cep}/json/`
    );
  }
}
