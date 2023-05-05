import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: "",
    redirectTo: "home",
    pathMatch: "full"
  },
  {
    path: "home",
    title: "Inicio",
    loadComponent: () => import('./pages/home/home.component').then( m => m.HomeComponent),
  },
  {
    path: "login",
    title: "Iniciar Sesión",
    loadComponent: () => import('./pages/login/login.component').then( m => m.LoginComponent),
  },
  {
    path: "quien-soy",
    title: "Quien soy",
    loadComponent: () => import('./pages/quien-soy/quien-soy.component').then( m => m.QuienSoyComponent),
  },
  {
    path: "**",
    redirectTo: "home",
    pathMatch: "full"
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
