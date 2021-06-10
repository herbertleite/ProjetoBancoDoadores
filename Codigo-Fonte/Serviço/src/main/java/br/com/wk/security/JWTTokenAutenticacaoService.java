package br.com.wk.security;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import br.com.wk.ApplicationContextLoad;
import br.com.wk.model.Role;
import br.com.wk.model.Usuario;
import br.com.wk.repository.UsuarioRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
@Component
public class JWTTokenAutenticacaoService {
	
	
	private static final long EXPIRATION_TIME = 172800000;
	
	private static final String SECRET = "SenhaExtremamenteSecreta";
	
	private static final String TOKEN_PREFIX = "Bearer";
	
	private static final String HEADER_STRING = "Authorization";
	
	private String Autoridades = "";
	
	
	public void addAuthentication(HttpServletResponse response , String username) throws IOException {
		
		Usuario usuario = ApplicationContextLoad.getApplicationContext()
		        .getBean(UsuarioRepository.class).findUserByLogin(username);
		for (Role r : usuario.getAuthorities()) {
			Autoridades = Autoridades + r.getNomeRole();
		}
		
		String JWT = Jwts.builder() 
				        .setSubject(username) 
				        .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
				        .setAudience(Autoridades)
				        .signWith(SignatureAlgorithm.HS512, SECRET).compact();
		
	
		String token = TOKEN_PREFIX + " " + JWT; /*Bearer 87878we8we787w8e78w78e78w7e87w*/
		
		ApplicationContextLoad.getApplicationContext()
	    .getBean(UsuarioRepository.class).atualizaTokenUser(JWT,username);
		
		response.addHeader(HEADER_STRING, token); 
		
		response.getWriter().write("{\"Authorization\": \""+token+"\"}");
		
	}
	
	
	public Authentication getAuhentication(HttpServletRequest request, HttpServletResponse response) throws UnsupportedEncodingException {
		
		String token = request.getHeader(HEADER_STRING);
		
		try {
		
		if (token != null) {
		String user = Jwts.parser()
								.setSigningKey(SECRET) 
								.parseClaimsJws(token.replace(TOKEN_PREFIX, "")) 
								.getBody().getSubject(); 
			if (user != null) {
				Usuario usuario = ApplicationContextLoad.getApplicationContext()
						        .getBean(UsuarioRepository.class).findUserByLogin(user);
				
				if (usuario != null) {
					return new UsernamePasswordAuthenticationToken(
							usuario.getLogin(), 
							usuario.getSenha(),
							usuario.getAuthorities());
				}
			}
			
		}
		
		}catch (io.jsonwebtoken.ExpiredJwtException e) {
			return null;
		}
		return null;
	}

}
