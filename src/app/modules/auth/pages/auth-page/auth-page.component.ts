import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css']
})
export class AuthPageComponent implements OnInit {
  errorSession: boolean  = false; //error que salta cuando el usuario sea incorrecto
  //formulario de clarado tipo FormGroup
  formLogin:  FormGroup = new FormGroup({});

  //la "inyeccion" de datos la haremos desde el constructor de nuestro login
  //inyectamos router para devolver a una ruta, cookie para gestionar las cookies y authservice para controlar si el login es correcto
  constructor(private authService: AuthService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    this.formLogin = new FormGroup(
      {//declaramos los formcontrols para usarlos en los inputs del html
        //que seguiran los siguientes requisitos
        email: new FormControl('', [
          Validators.required,
          Validators.email
        ]),
        password: new FormControl('',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(12)
          ])
      }
    )
  }
  //funcion para recoger los datos del formulario
  sendLogin(): void {
    const { email, password } = this.formLogin.value
    this.authService.sendCredentials(email, password)
      .subscribe(responseOk => { //Cuando el usuario use credenciales corretas
        console.log('Sesion iniciada de forma correcta', responseOk);
        const { tokenSession, data } = responseOk;
        this.cookie.set("token", tokenSession, 4, "/"); //asignado token con valor que aparece en la consola web, que durara 4 dias y servira para / toda la pagina
        this.router.navigate(["/", "tracks"]) //cuando el login sea correcta, redirecciona a tracks

        /*
        const { tokenSession, data } = responseOk
        this.cookie.set('token', tokenSession, 4, '/')
        this.router.navigate(['/', 'tracks'])
        */
      },
        err => {
          this.errorSession = true
          console.log('Usuario o contraseña incorrectas');
        })

  }

}
