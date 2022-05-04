import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page', //lo que vamos a utilizar para llamar este componente al html
  templateUrl: './home-page.component.html', //el html asociado al componente
  styleUrls: ['./home-page.component.css'] //la url del archivo que contiene los estilos que solo van a afectar al componente
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
