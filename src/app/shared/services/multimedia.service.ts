import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList } from "@angular/fire/database";
@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()

  public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
  public audio!: HTMLAudioElement // audio del servicio HTMLElement
  public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')//declaramos el 00 para la base del tiempo transcurrido
  public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00') //tiempo restante
  //boton
  public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
  //barra reproduccion
  public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

  constructor() {

    this.audio = new Audio()

    this.trackInfo$.subscribe(responseOK => { //suscripcion para el audio
      if (responseOK) {
        this.setAudio(responseOK)
      }
    })

    this.listenAllEvents()

  }

  private listenAllEvents(): void {

    this.audio.addEventListener('timeupdate', this.calculateTime, false) //tiempo
    this.audio.addEventListener('playing', this.setPlayerStatus, false) //el status del boton play, pause...
    this.audio.addEventListener('play', this.setPlayerStatus, false)
    this.audio.addEventListener('pause', this.setPlayerStatus, false)
    this.audio.addEventListener('ended', this.setPlayerStatus, false)

  }

  private setPlayerStatus = (state: any) => {
    switch (state.type) { //state dice si se esta reproduciendo o no
      case 'play':
        this.playerStatus$.next('play')
        break
      case 'playing':
        this.playerStatus$.next('playing')
        break
      case 'ended':
        this.playerStatus$.next('ended')
        break
      default:
        this.playerStatus$.next('paused') //si algo raro pasa, se pausa
        break;
    }

  }

  private calculateTime = () => {
    //son propiedades de HTMLAudio, duration coge la duracion del track desde nuestra bbdd y el current es el que ha
     //transcurrido ya. console.table([duration,currentTime]); //se va actualizando segun avanza la cancion
    const { duration, currentTime } = this.audio
    this.setTimeElapsed(currentTime)
    this.setRemaining(currentTime, duration)
    this.setPercentage(currentTime, duration)
  }

     //calcular barra que se movera
  private setPercentage(currentTime: number, duration: number): void {
    //duration ---> 100%
    //currentTime ---> (x)
    //(currentTime * 100) / duration
    let percentage = (currentTime * 100) / duration;
    this.playerPercentage$.next(percentage)
  }


  private setTimeElapsed(currentTime: number): void {
       //metodo para sacar el minuto y segundos exactos
    let seconds = Math.floor(currentTime % 60) //saco el residuo de la division (numero entero para segundos y minutos)
    let minutes = Math.floor((currentTime / 60) % 60)
    //TODO  00:00 ---> 01:05 --> 10:15
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds; //si los segundos son menores de 10, devuelve un string con un 0 delante
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;//si los minutos son menores de 10, devuelve un string con un 0 delante
    const displayFormat = `${displayMinutes}:${displaySeconds}`; //concatenamos la info de los minutos segundos
    this.timeElapsed$.next(displayFormat); //envia la info
  }

  private setRemaining(currentTime: number, duration: number): void {
    //restamos la duracion del track con la actual (current)
    let timeLeft = duration - currentTime;
    let seconds = Math.floor(timeLeft % 60) //saco el residuo de la division (numero entero para segundos y minutos)
    let minutes = Math.floor((timeLeft / 60) % 60)
    const displaySeconds = (seconds < 10) ? `0${seconds}` : seconds; //si los segundos son menores de 10, devuelve un string con un 0 delante
    const displayMinutes = (minutes < 10) ? `0${minutes}` : minutes;
    const displayFormat = `-${displayMinutes}:${displaySeconds}`
    this.timeRemaining$.next(displayFormat); //envia la info
  }


  //metodos publicos

  public setAudio(track: TrackModel): void {
    console.log('🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍🐱‍🏍', track);
    this.audio.src = track.url;//la url del archivo mp3 va a ser igual a track.url
    this.audio.play();
  }

  public togglePlayer(): void {
    (this.audio.paused) ? this.audio.play() : this.audio.pause() // si audio pausado, play y si no, pause (los metodos son de htmlaudio)
  }

  public seekAudio(percentage: number): void {
    const { duration } = this.audio
    const percentageToSecond = (percentage * duration) / 100
    this.audio.currentTime = percentageToSecond
//para la barrita negra que ira haciendose mas grande segun el tiempo que lleve de4 reproduccion
  }

  public anadirFavorito(): void {

  }

}
