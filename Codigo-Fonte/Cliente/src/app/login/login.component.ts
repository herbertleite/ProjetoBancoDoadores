import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { User } from '../model/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = { login: '', senha: '' };
  radio : number = 0;
  senha2: string;


  constructor(
    private loginService: LoginServiceService,
    private router: Router,
    private userService: UsuarioService,
    ) { }


  ngOnInit() {
    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null) {
        var str = atob(localStorage.getItem("token").split(".")[1]);
        var verificaAdmin = str.indexOf("ROLE_ADMIN") > -1;
        var verificaUser = str.indexOf("ROLE_USER") > -1;
        if(verificaAdmin){
          this.router.navigate(['home-admin']);
         }
        if(verificaUser){
          this.router.navigate(['home-doador']);
         }
    }
  }


  public logar() {
    this.loginService.login(this.user);
  }

  public cadastrar() {
    if(this.user.senha == this.senha2){
      if(this.radio == 0){
        alert("Informe sua categoria");
      }
      else if(this.radio == 2){
        console.info(this.radio)
        this.userService.salvarUsuarioAdmin(this.user).subscribe
        (data => {console.info("Gravou User: " + data);
        alert("Usuario cadastrado com sucesso");
          this.novo();
        }
        ),(error) => {
          alert("Ocorreu um erro");
      };

      }
      else if(this.radio == 1){
        console.info(this.radio)
        this.userService.salvarUsuarioDoador(this.user).subscribe
        (data => {console.info("Gravou User: " + data);
        alert("Usuario cadastrado com sucesso");
          this.novo();
        }
        ),(error) => {
          alert("Ocorreu um erro");
      };
      }
  
  }else{
    alert("As senhas devem ser iguais")
  }
  }

  novo() {
    this.user = { login: '', senha: '' };
  }


  radio1clicado(){
      this.radio=1;
    }
    radio2clicado(){
     this.radio=2;
   }

  

}
