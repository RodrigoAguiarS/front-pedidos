import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private readonly authService: AuthService,
    private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.getUserRoles().pipe(
      switchMap((userRoles: string[]) => {
        const requiredRoles = route.data['roles'] as string[];
        console.log('Roles necessárias:', requiredRoles); // Adicione este log para verificar as roles necessárias
        console.log('Roles do usuário:', userRoles); // Adicione este log para verificar as roles do usuário

        if (!requiredRoles) {
          console.log('Nenhuma role necessária encontrada, redirecionando para /acesso-negado'); // Adicione este log para verificar a navegação
          this.router.navigate(['/acesso-negado']);
          return of(false);
        }

        if (requiredRoles.some((role) => userRoles.includes(role))) {
          console.log('Acesso permitido'); // Adicione este log para verificar o acesso permitido
          return of(true);
        } else {
          console.log('Acesso negado, redirecionando para /acesso-negado'); // Adicione este log para verificar a navegação
          this.router.navigate(['/acesso-negado']);
          return of(false);
        }
      }),
      catchError((error) => {
        console.log('Erro ao obter roles do usuário, redirecionando para /login', error); // Adicione este log para verificar o erro
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
