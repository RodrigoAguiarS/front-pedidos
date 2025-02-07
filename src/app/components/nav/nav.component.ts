import { Component } from '@angular/core';
import { catchError, of, Subscription, switchMap } from 'rxjs';
import { Usuario } from '../../model/Usuario';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsuarioService } from '../../services/usuario.service';
import { UsuariochangeService } from '../../services/usuariochange.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from "../header/header.component";
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';

@Component({
  selector: 'app-nav',
  imports: [
    NzLayoutModule,
    CommonModule,
    RouterModule,
    NzIconModule,
    NzMenuModule,
    HeaderComponent
],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  isCollapsed = false;
  isMenu1Active = true;
  roles: string[] = [];
  usuario: Usuario = new Usuario();
  userChangeSubscription!: Subscription;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly usuarioService: UsuarioService,
    private readonly message: NzMessageService,
    private readonly usuarioChange: UsuariochangeService
  ) {}

  ngOnInit(): void {
    this.subscribeToUserChanges();
    this.carregarPapelUsuario();
    this.carregarUsuario();
  }

  ngOnDestroy(): void {
    if (this.userChangeSubscription) {
      this.userChangeSubscription.unsubscribe();
    }
  }

    toggleMenu() {
    this.isMenu1Active = !this.isMenu1Active;
  }

  private subscribeToUserChanges(): void {
    this.userChangeSubscription = this.usuarioChange.userChanged$
      .pipe(
        switchMap(() =>
          this.authService.getUserRoles().pipe(
            catchError((error) => {
              this.message.error(error.error.message);
              return of([]);
            })
          )
        )
      )
      .subscribe((roles: string[]) => {
        this.roles = roles;
        this.carregarUsuario();
      });
  }

  private carregarPapelUsuario(): void {
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.roles = roles;
      },
      error: (error) => {
        this.message.error(error.error.message);
      },
    });
  }

  private carregarUsuario(): void {
    this.usuarioService.obterDadosUsuario().subscribe({
      next: (usuario: Usuario) => {
        this.usuario = usuario;
      },
      error: (error) => {
        this.message.error(error.error.message);
      },
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
    this.message.info('Usuário deslogado com sucesso');
  }

  onKeyDown(event: KeyboardEvent) {
    console.log('Key pressed:', event.key);
  }
}
