import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { TrackService } from '@modules/tracks/services/track.service';
import { Subscription } from 'rxjs';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-play-list-body',
  templateUrl: './play-list-body.component.html',
  styleUrls: ['./play-list-body.component.css']
})
export class PlayListBodyComponent implements OnInit, OnDestroy {
  @Input() tracks:Array<TrackModel> = []; //teniendo input le decimos que queremos pasarle unas canciones. llama al servicio

  constructor(private trackService:TrackService, private multimediaService: MultimediaService) {}

  ngOnInit(): void {
/*
    this.trackService.getCanciones$().subscribe((response: TrackModel[]) => {
      this.tracks = response
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
