import { SessionGuard } from './core/guards/session.guard';
import { HomePageComponent } from './modules/home/pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//archivo de rutas principal de la app
const routes: Routes = [
  {
    path:"auth", //esto es un lazyloading
    loadChildren:() => import("./modules/auth/auth.module").then(m => m.AuthModule)//necesita una importacion dinamica de 1 modulo  la relacionamos con el componente home module
  },
  {
    path:"",
    component: HomePageComponent, //lo llamamos a la vez que la cargar del modulo
    loadChildren:() => import("./modules/home/home.module").then(m => m.HomeModule),//necesita una importacion dinamica de 1 modulo  la relacionamos con el componente home module
    canActivate:[SessionGuard]
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
