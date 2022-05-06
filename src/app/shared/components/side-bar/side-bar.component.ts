import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  mainMenu: { //inicializar | va a contener un objeto y ese objeto a su vez tendra dos propiedades
    //default y access
    defaultOptions: Array<any>, accessLink:Array<any>, cerrarSesion:Array<any> //lista de arrays
  } = { defaultOptions: [], accessLink: [], cerrarSesion: []}

customOptions: Array<any> = []

  constructor(private router:Router) { }

  ngOnInit(): void { //ciclo de vida, los componentes tienen 8 | onInit es el primer ciclo despues del contructor
    //se hace para peticiones o servicios con url
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate', //los iconos se sacan de la libreria
        router: ['/', 'tracks']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites']
      },

      {
        name: 'Cerrar sesión',
        icon: 'uil uil-sad',
        router: ['/', 'auth/login'],
      }
    ]
    this.customOptions = [
      {
        name: 'Mi lista º1 (Próximamente)',
        router: ['/']
      },
      {
        name: 'Mi lista º2',
        router: ['/']
      },
      {
        name: 'Mi lista º3',
        router: ['/']
      },
      {
        name: 'Mi lista º4',
        router: ['/']
      }
    ]

  }

  goTo($event: any): void{
    this.router.navigate(['/', 'favorites'],{
      queryParams:{

      }
    })
  }

}
