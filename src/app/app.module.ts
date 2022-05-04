import { DataServices } from './data.services';
import { CookieService } from 'ngx-cookie-service';
//para poder importar las coockies hay que escribir en terminal: npm install ngx-cookie-service --save
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { AngularFireModule } from "@angular/fire"

@NgModule({
  declarations: [ //declaraciones: componentes, directivas, pipes
    AppComponent,
  ],
  imports: [ //solo se importan otros modulos
    BrowserModule,
    AppRoutingModule,
    HttpClientModule //libreria para hacer peticiones a la api de canciones lofi
  ],
  providers: [CookieService, DataServices], //importamos las cookies como provider (revisar documentacion)
  bootstrap: [AppComponent]
})
export class AppModule { }
