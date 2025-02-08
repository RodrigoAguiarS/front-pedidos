import { CPFPipe } from './../../../../pipe';
import { Component } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Usuario } from '../../../model/Usuario';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { Perfil } from '../../../model/Perfil';
import { PerfilService } from '../../../services/perfil.service';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CPFPipe,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzButtonModule,
    NzIconModule,
    NzSelectModule,
    NzPaginationModule,
    RouterModule,
  ],
  templateUrl: './usuario-list.component.html',
  styleUrl: './usuario-list.component.css',
})
export class UsuarioListComponent {
  usuarios: Usuario[] = [];
  perfis: Perfil[] = [];
  loading: boolean = false;
  totalElements = 0;
  pageSize = 10;
  currentPage = 1;
  nomeFilter: string = '';
  cpfFilter: string = '';
  perfilFilter?: number;

  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly perfilService: PerfilService,
    private readonly message: NzMessageService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.carregarPerfis();
  }

  searchUsuarios(): void {
    this.currentPage = 1;
    this.findAllUsuarios();
  }

  findAllUsuarios() {
    this.loading = true;

    const params = {
      page: this.currentPage - 1,
      size: this.pageSize,
      sort: 'email',
      nome: this.nomeFilter.trim().toLowerCase(),
      cpf: this.cpfFilter.replace(/\D/g, ''),
      perfilId: this.perfilFilter,
    };

    this.usuarioService.buscarPaginado(params).subscribe({
      next: (data) => {
        this.usuarios = data.content;
        this.totalElements = data.totalElements;
        this.loading = false;
      },
      error: (e) => {
        this.message.error('Erro ao buscar usuários');
        this.loading = false;
      },
    });
  }

  carregarPerfis(): void {
    this.perfilService.findAll().subscribe({
      next: (perfis) => {
        this.perfis = perfis;
      },
      error: (ex) => {
        this.message.error(ex.error.message);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.findAllUsuarios();
  }

  entrarCadastro() {
    this.router.navigate(['funcionarios/create']);
  }
}
