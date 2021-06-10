package br.com.wk.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import br.com.wk.model.Candidato;
import br.com.wk.repository.CandidatoRepository;

@Service
public class CandidatoServiceImpl implements CandidatoService{

	CandidatoRepository candidatoRepository;
	
	@Override
	public int salvarCandidatos(List<Candidato> candidatos) {
		candidatos.stream()
	    .forEach(candidato -> candidatoRepository.save(candidato));
		return 1; 
	}
}
