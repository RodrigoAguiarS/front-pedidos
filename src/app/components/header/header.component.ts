import { Component } from '@angular/core';
import { Usuario } from '../../model/Usuario';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UsuarioService } from '../../services/usuario.service';
import { UsuariochangeService } from '../../services/usuariochange.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  usuario: Usuario = new Usuario();
  papel: string[] = [];

  constructor(private readonly authService: AuthService,
    private readonly message: NzMessageService,
    private readonly usuarioService: UsuarioService,
    private readonly userChangeService: UsuariochangeService
  ) { }

  ngOnInit(): void {
    this.carregarUsuario();
    this.carregarPapelUsuario();
    this.userChangeService.userChanged$.subscribe(() => {
      this.carregarUsuario();
      this.carregarPapelUsuario();
    });
  }

  private carregarPapelUsuario(): void {
    this.authService.getUserRoles().subscribe({
      next: (roles: string[]) => {
        this.papel = roles;
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
}
