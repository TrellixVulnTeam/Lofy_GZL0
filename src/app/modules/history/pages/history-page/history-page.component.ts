import { Component, OnInit } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { SearchService } from '@modules/history/services/search.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit {
  listResults$: Observable<any> = of([]); //of devuelve una instancia del observable que proporciona los valores
  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  receiveData(event:string):void{
    //Coge el termino y solo se ejecuta cuando tiene 3 caracters
    this.listResults$ = this.searchService.searchTracks$(event)

  }
}
