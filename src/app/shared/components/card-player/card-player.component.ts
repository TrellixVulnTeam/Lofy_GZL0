import { TrackModel } from './../../../core/models/tracks.model';
import { Component, Input, OnInit } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';

@Component({
  selector: 'app-card-player',
  templateUrl: './card-player.component.html',
  styleUrls: ['./card-player.component.css']
})
export class CardPlayerComponent implements OnInit {
  @Input() mode: 'small' | 'big' = 'small'; //puede ser grande o pequeño, pero inicializamos en pequeño
  @Input() track:TrackModel = {_id:0, name:'', album:'', url:'', cover:''}; //lo inicializamos

  constructor(private multimediaService: MultimediaService ) { }

  ngOnInit(): void {
  }

  sendPlay(track:TrackModel):void{
    //emit sirve para enviar
    //este metodo enviara el objeto track al reproductor
    this.multimediaService.trackInfo$.next(track) //le dice a trackinfo que mande el track por el "tubo del observable"
  }

}
