import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient, private router: Router,

    ) { }

ngOnInit() { }

    login(usuario){

       return this.http.post(AppConstants.baseLogin ,JSON.stringify(usuario)).subscribe(data => {

       var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

      localStorage.setItem("token", token);

      var str = atob(localStorage.getItem("token").split(".")[1]);
      var verificaAdmin = str.indexOf("ROLE_ADMIN") > -1;
      var verificaUser = str.indexOf("ROLE_USER") > -1;
      if(verificaAdmin){
        this.router.navigate(['home-admin']);
       }
      if(verificaUser){
        this.router.navigate(['home-doador']);
       }
       
       },
         error => {

          console.error("Erro ao fazer login ");
          alert('Acesso Negado!')
         }
       );
    }


}
