package br.com.wk.controller;

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
import br.com.wk.repository.UsuarioRepository;
import br.com.wk.service.ImplementacaoUserDetailsService;


@RestController
@RequestMapping(value = "/usuario")
public class UsuarioController {

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private ImplementacaoUserDetailsService implementacaoUserDetailsSercice;

	@PostMapping(value = "/admin", produces = "application/json")
	public ResponseEntity<Usuario> cadastrarAdmin(@Valid @RequestBody Usuario usuario) {
		String senhacriptografada = new BCryptPasswordEncoder().encode(usuario.getSenha());
		usuario.setSenha(senhacriptografada);
		Usuario usuarioSalvo = usuarioRepository.save(usuario);
		implementacaoUserDetailsSercice.insereAcessoPadraoAdmin(usuarioSalvo.getId());
		return new ResponseEntity<Usuario>(usuarioSalvo, HttpStatus.OK);
	} 

	@PostMapping(value = "/doador", produces = "application/json")
	public ResponseEntity<Usuario> cadastrarDoador(@Valid @RequestBody Usuario usuario) {
		String senhacriptografada = new BCryptPasswordEncoder().encode(usuario.getSenha());
		usuario.setSenha(senhacriptografada);
		Usuario usuarioSalvo = usuarioRepository.save(usuario);
		implementacaoUserDetailsSercice.insereAcessoPadraoUsuario(usuarioSalvo.getId());
		return new ResponseEntity<Usuario>(usuarioSalvo, HttpStatus.OK);
	}
	

}
