import { Injectable } from '@angular/core';
import { Perfil } from '../model/Perfil';
import { map, mergeMap, Observable, of, toArray } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private readonly http: HttpClient) { }

  findAllPaginated(page: number, size: number): Observable<Perfil[]> {
    return this.http.get<{ content: Perfil[] }>(`${API_CONFIG.baseUrl}/perfis?page=${page}&size=${size}&sort=nome,asc`)
      .pipe(map(response => response.content));
  }

  findAll(): Observable<Perfil[]> {
    const pageSize = 50;
    let currentPage = 0;
    let allPerfis: Perfil[] = [];

    return this.findAllPaginated(currentPage, pageSize).pipe(
      mergeMap(perfis => {
        allPerfis = allPerfis.concat(perfis);
        if (perfis.length < pageSize) {
          return of(allPerfis);
        } else {
          currentPage++;
          return this.findAllPaginated(currentPage, pageSize).pipe(
            mergeMap(nextPerfis => {
              allPerfis = allPerfis.concat(nextPerfis);
              return of(allPerfis);
            })
          );
        }
      }),
      toArray(),
      map((arrays: any[]) => arrays.flat())
    );
  }

  findById(id: any): Observable<Perfil> {
    return this.http.get<Perfil>(`${API_CONFIG.baseUrl}/perfis/${id}`);
  }

  create(perfil: Perfil): Observable<Perfil> {
    return this.http.post<Perfil>(`${API_CONFIG.baseUrl}/perfis`, perfil);
  }

  update(perfil: Perfil): Observable<Perfil> {
    return this.http.put<Perfil>(`${API_CONFIG.baseUrl}/perfis/${perfil.id}`, perfil);
  }

  delete(id: any): Observable<Perfil> {
    return this.http.delete<Perfil>(`${API_CONFIG.baseUrl}/perfis/${id}`);
  }
}
