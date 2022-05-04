import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //rutas que vamos a usar con el auth
  {
   path: "login",
   component: AuthPageComponent
  },
  {
    path: "**", //significa que si se pone una ruta que no se reconozca, te manda al login
    redirectTo:"/auth/login"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
