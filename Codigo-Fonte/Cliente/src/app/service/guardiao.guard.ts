import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from './usuario.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardiaoGuard implements CanActivate {

  constructor(private userServcice: UsuarioService, private router: Router,
    ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var str = atob(localStorage.getItem("token").split(".")[1]);
    var verificaAdmin = str.indexOf("ROLE_ADMIN") > -1;
    if(this.userServcice.userAutenticado() && verificaAdmin){
    return true;
     }
  }

}
