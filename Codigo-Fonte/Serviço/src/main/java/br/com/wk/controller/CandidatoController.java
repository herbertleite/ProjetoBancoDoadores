package br.com.wk.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.wk.model.Usuario;
import br.com.wk.model.Candidato;
import br.com.wk.service.CandidatoService;
import br.com.wk.service.ImplementacaoUserDetailsService;

@RestController
@RequestMapping(value = "/candidato")
public class CandidatoController {


	private CandidatoService candidatoService;

	@Autowired
	private ImplementacaoUserDetailsService implementacaoUserDetailsSercice;
	
	@PostMapping(value = "/salvaCandidatos", produces = "application/json")
	public ResponseEntity<Integer> salvarCandidatos(@Valid @RequestBody List<Candidato> candidatos) {
		return new ResponseEntity<Integer>(candidatoService.salvarCandidatos(candidatos), HttpStatus.OK); 
	}
}
