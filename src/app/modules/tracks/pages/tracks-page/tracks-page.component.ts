import { TrackModel } from './../../../../core/models/tracks.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy {
  tracksTrending:Array<TrackModel> = []
  tracksRandom:Array<TrackModel> = []
  tracksFavoritos:Array<TrackModel> = []
  listObservers$:Array<Subscription> = []


  //inyectamos servicio de tracks
  constructor(private trackService:TrackService) { }

  ngOnInit(): void {

    this.trackService.getCanciones$().subscribe((response: TrackModel[]) => {
      this.tracksFavoritos = response
    })

    //suscripcion 1: tracks ordenados
    this.trackService.getAllTracks$().subscribe((response: TrackModel[]) => {
      this.tracksTrending = response
    })

    //suscripcion 2: tracks al reves
    this.trackService.getAllRandom$().subscribe((response: TrackModel[]) => {
      this.tracksRandom = response
    })

  }

  ngOnDestroy(): void {

  }

  canciones2:TrackModel[]=[];

}
