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
    defaultOptions: Array<any>, accessLink:Array<any> //lista de arrays
  } = { defaultOptions: [], accessLink: []}

customOptions: Array<any> = []

  constructor(private router:Router) { }

  ngOnInit(): void { //ciclo de vida, los componentes tienen 8 | onInit es el primer ciclo despues del contructor
    //se hace para peticiones o servicios con url
    this.mainMenu.defaultOptions = [
      {
        name: 'Home',
        icon: 'uil uil-estate', //los iconos se sacan de la libreria
        router: ['/', 'auth']
      },
      {
        name: 'Buscar',
        icon: 'uil uil-search',
        router: ['/', 'history']
      },
      {
        name: 'Tu biblioteca',
        icon: 'uil uil-chart',
        router: ['/', 'favorites'],
        query: { hola: 'mundo' }
      }
    ]
    this.mainMenu.accessLink = [
      {
        name: 'Crear lista',
        icon: 'uil-plus-square'
      },
      {
        name: 'Canciones que te gustan',
        icon: 'uil-heart-medical'
      }
    ]

    this.customOptions = []

  }

  goTo($event: any): void{
    this.router.navigate(['/', 'favorites'],{
      queryParams:{
        key1:"value1",
        key2:"value2",
        key3:"value3"
      }
    })
  }

}
