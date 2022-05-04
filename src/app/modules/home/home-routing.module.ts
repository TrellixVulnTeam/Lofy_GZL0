import { HomePageComponent } from './pages/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  //aqui se llamara a todo lo que se renderizara dentro del homerouting y no destruyen los demas componentes
  path:"tracks",
  loadChildren:() => import("@modules/tracks/tracks.module").then(m => m.TracksModule) //funcion promesa
},
{
  path:"favorites",
  loadChildren:() => import("@modules/favorites/favorites.module").then(m => m.FavoritesModule) //funcion promesa
},
{
  path:"history",
  loadChildren:() => import("@modules/history/history.module").then(m => m.HistoryModule) //funcion promesa
},
{
  path:"**", //para cuando no exista la ruta
  redirectTo: "/tracks"
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
