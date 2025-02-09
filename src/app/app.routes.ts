import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { NoAuthGuard } from './auth/noauth.guard';
import { AuthGuard } from './auth/auth.guard';
import { RoleGuard } from './auth/role.guard';
import { ACESSO } from './model/Acesso';
import { UsuarioCreateComponent } from './components/usuario/usuario-create/usuario-create.component';
import { UsuarioListComponent } from './components/usuario/usuario-list/usuario-list.component';
import { UsuarioResultComponent } from './components/usuario/usuario-result/usuario-result.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  {
    path: '',
    component: NavComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR, ACESSO.USUARIO] },
      },
      {
        path: 'usuarios/create',
        component: UsuarioCreateComponent,
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
      },
      {
        path: 'usuarios/list',
        component: UsuarioListComponent,
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
      },
      {
        path: 'usuarios/result',
        component: UsuarioResultComponent,
        canActivate: [RoleGuard],
        data: { roles: [ACESSO.ADMINISTRADOR] },
      },
    ],
  },
];
