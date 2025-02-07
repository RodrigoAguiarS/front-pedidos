import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credenciais } from '../model/Credenciais';
import { API_CONFIG } from '../config/api.config';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private readonly http: HttpClient) {}

  authenticate(creds: Credenciais) {
    console.log('Autenticando usuário com credenciais:', creds); // Adicione este log para verificar as credenciais
    return this.http.post(`${API_CONFIG.baseUrl}/auth/login`, creds, {
      observe: 'response',
      responseType: 'text',
    });
  }

  getUserRoles(): Observable<string[]> {
    console.log('Obtendo roles do usuário'); // Adicione este log para verificar a obtenção de roles
    return this.http.get<string[]>(`${API_CONFIG.baseUrl}/usuarios/papel`);
  }

  successfulLogin(token: string) {
    console.log('Salvando token no localStorage:', token); // Adicione este log para verificar o token
    localStorage.setItem('token', token);
  }

  isAuthenticated() {
    let token = localStorage.getItem('token');
    console.log('Token encontrado no localStorage:', token); // Adicione este log para verificar o token
    if (token != null) {
      let isExpired = this.jwtService.isTokenExpired(token);
      console.log('Token expirado:', isExpired); // Adicione este log para verificar se o token está expirado
      return !isExpired;
    }
    return false;
  }

  logout() {
    console.log('Limpando localStorage'); // Adicione este log para verificar a limpeza do localStorage
    localStorage.clear();
  }
}
