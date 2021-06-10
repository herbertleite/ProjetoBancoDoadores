import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private http: HttpClient) {
  }

  salvarUsuarioDoador(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlUsuario + "doador", user);
  }

  salvarUsuarioAdmin(user): Observable<any> {
    return this.http.post<any>(AppConstants.baseUrlUsuario + "admin", user);
  }

  userAutenticado() {

    if (localStorage.getItem('token') !== null &&
      localStorage.getItem('token').toString().trim() !== null) {
      return true;
    } else {
      return false;
    }
  }

}
