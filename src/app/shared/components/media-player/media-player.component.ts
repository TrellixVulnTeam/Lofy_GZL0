import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { MultimediaService } from '@shared/services/multimedia.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-media-player', // <==== con esto llamamos en el html al componente
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  //maquetacion
  mockCover!: TrackModel;
  state: string = "paused";
  //lista de subscribers
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []

  //inyectamos el servicio de las canciones
  constructor(public multimediaService:MultimediaService) { }

  //la suscripcion es decirle al componente "tienes que estar pendiente
  //de que pase X cosa" y "ya no estes pendiente"
  ngOnInit(): void {


    const obserber1$ = this.multimediaService.playerStatus$.subscribe(status => this.state = status) //con el observable nos suscribimos al status del reproductor
    //y lo metemos en la variable state creada en la clase
    /*
    El observer de media-player igualará el status del track a pause de manera predefinida,
    para que no comience la canción al hacer click en el card del track,
    solo al darle al botón de play.
    */

    this.listObservers$ = [obserber1$] //para desuscribirse cuando se "destruya" el componente
    /*
    const objerber1$ = this.multimediaService.trackInfo$.subscribe(res =>{

    })*/

    //esa constante forma parte de la programacion reacitva

    //guardamos el observer en la lista

  }

  //exportamos el onDestroy y creanmos el ciclo de vida aqui
  ngOnDestroy(): void {
    //ondestroy es el ultimo que se ejecuta

    //desuscribimos por cada elemento suscrito cuando se
      //elimine el componente (yendo a inicio o donde sea)
    this.listObservers$.forEach(u=>u.unsubscribe) //for each


  }

  handlePosition(event: MouseEvent): void {
    const elNative: HTMLElement = this.progressBar.nativeElement
    const { clientX } = event
    const { x, width } = elNative.getBoundingClientRect()
    const clickX = clientX - x //TODO: 1050 - x
    const percentageFromX = (clickX * 100) / width
    console.log(`Click(x): ${percentageFromX}`);
    this.multimediaService.seekAudio(percentageFromX)
  }


}
