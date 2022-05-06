import { TrackModel } from './../../../../core/models/tracks.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { MultimediaService } from '@shared/services/multimedia.service';
import { collection, query, where } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


@Component({
  selector: 'app-favorites-page',
  templateUrl: './favorites-page.component.html',
  styleUrls: ['./favorites-page.component.css']
})
export class FavoritesPageComponent implements OnInit {
  listObservers$:Array<Subscription> = []
  @Input() tracksFavoritos:Array<TrackModel> = [];
  //inyectamos servicio de tracks
  constructor(private trackService:TrackService,  private multimediaService: MultimediaService) { }

  ngOnInit(): void {

        this.trackService.getFavoritos$().subscribe((response: TrackModel[]) => { //necesito suscribirme para poder ver los datos
          //console.log(response);
          this.tracksFavoritos=Object.values(response);
          //this.tracksFavoritos = response;
          this.multimediaService.setFavoritos(this.tracksFavoritos);
        })

/*
        this.trackService.getFavoritosBackup$().subscribe((response: TrackModel[]) => { //necesito suscribirme para poder ver los datos
          //console.log(response);
          this.tracksFavoritos=Object.values(response);
          //this.tracksFavoritos = response;
          this.multimediaService.setFavoritos(this.tracksFavoritos);
        })
        */
  }

  ngOnDestroy(): void {

  }

  sendPlay(track:TrackModel):void{
    //emit sirve para enviar
    //este metodo enviara el objeto track al reproductor
    this.multimediaService.trackInfo$.next(track) //le dice a trackinfo que mande el track por el "tubo del observable"
  }
}
