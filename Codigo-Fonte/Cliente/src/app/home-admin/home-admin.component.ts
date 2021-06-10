import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Candidato } from '../model/Candidato';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  candidato: Candidato = new Candidato();
  tamanhoLista: number = 0;
  list: Array<Candidato>;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.candidato =  new Candidato();
  }

  public sair() {
    localStorage.clear();
    location.reload()
  }

  add(){
    this.candidato =  new Candidato();
    this.tamanhoLista ++;
  }

  processar(){
    this.candidato =  new Candidato();
    this.tamanhoLista = 0;
    this.router.navigateByUrl('/home-doador');
  }

}
