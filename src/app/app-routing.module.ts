import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {canActivate, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    title: 'Inicio',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'login',
    title: 'Iniciar Sesión',
    loadComponent: () =>
      import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    title: 'Registrarme',
    loadComponent: () =>
      import('./pages/register/register.component').then(
        (m) => m.RegisterComponent
      ),
  },
  {
    path: 'quien-soy',
    title: 'Quien soy',
    loadComponent: () =>
      import('./pages/quien-soy/quien-soy.component').then(
        (m) => m.QuienSoyComponent
      ),
  },
  {
    path: 'ahorcado',
    title: 'Ahorcado',
    loadComponent: () =>
      import('./pages/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'mayoromenor',
    title: 'Mayor o Menor',
    loadComponent: () =>
      import('./pages/mayoromenor/mayoromenor.component').then(
        (m) => m.MayoromenorComponent
      ),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'preguntados',
    title: 'Preguntados',
    loadComponent: () =>
      import('./pages/preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
      ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  },
  // {
  //   path: 'mygame',
  //   title: 'Mi Juego',
  //   loadComponent: () =>
  //     import('./pages/mygame').then(
  //       (m) => m.
  //     ),
  //     ...canActivate(()=> redirectUnauthorizedTo(['/login']))
  // },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
