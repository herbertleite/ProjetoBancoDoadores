package br.com.wk.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wk.model.Candidato;
import br.com.wk.service.CandidatoService;

@RestController
@RequestMapping(value = "/candidato")
public class CandidatoController {


	@Autowired
	private CandidatoService candidatoService;

	
	@PostMapping(value = "/salvaCandidatos", produces = "application/json")
	public ResponseEntity<Integer> salvarCandidatos(@Valid @RequestBody List<Candidato> candidatos) {
		System.out.println("Chegou");
		return new ResponseEntity<Integer>(candidatoService.salvarCandidatos(candidatos), HttpStatus.OK); 
	}
}
