import { ArtistModel } from "./artist.model";

export class TrackModel {

  constructor(name:string, album:string, cover:string, url:string, _id:number){
    this.name = name;
    this.album = album;
    this.cover = cover;
    this.url = url;
    this._id = _id;
  }

  name: string =""
  album: string=""
  cover: string=""
  url: string=""
  _id: number=0


}
