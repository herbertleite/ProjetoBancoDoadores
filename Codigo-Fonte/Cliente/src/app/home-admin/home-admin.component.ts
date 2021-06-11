import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Candidato } from '../model/Candidato';
import {CandidatoService} from '../service/candidato.service'

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  candidato: Candidato = new Candidato();
  tamanhoLista: number = 0;
  listCandidatos: Array<Candidato> = new Array<Candidato>();

  constructor(
    private router: Router, private candidatoService: CandidatoService
    ) {

  }

  ngOnInit() {


  }

  public sair() {
    localStorage.clear();
    location.reload()
  }

  add(){
    this.listCandidatos.push(this.candidato)
    this.candidato =  new Candidato();
    this.tamanhoLista ++;
    console.info(this.listCandidatos);
  }

  processar(){
    this.candidatoService.salva(this.listCandidatos).subscribe(data => {
      let i = data;
    });
    this.listCandidatos = new Array<Candidato>();
    console.info(this.listCandidatos);
    this.candidato =  new Candidato();
    this.tamanhoLista = 0;
    alert("Sucesso na operação");
  }

  consultar(){
    this.router.navigateByUrl('/home-doador');
  }

}
