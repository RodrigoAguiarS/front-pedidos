import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  // Verifique se a solicitação é para o endpoint de login
  if (req.url.includes('/auth/login')) {
    return next(req).pipe(
      tap({
        next: (event) => {
          // Lógica adicional para a resposta, se necessário
        },
        error: (error) => {
          // Lógica adicional para o erro, se necessário
        }
      })
    );
  }

  // Adicione o cabeçalho de autorização se o token estiver presente
  const newReq = token ? req.clone({
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  }) : req;

  return next(newReq).pipe(
    tap({
      next: (event) => {
        // Lógica adicional para a resposta, se necessário
      },
      error: (error) => {
        // Lógica adicional para o erro, se necessário
      }
    })
  );
};
