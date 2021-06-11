package br.com.wk.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import br.com.wk.service.ImplementacaoUserDetailsService;

@Configuration
@EnableWebSecurity
public class WebConfigSecurity extends WebSecurityConfigurerAdapter {
	
	@Autowired
	private ImplementacaoUserDetailsService implementacaoUserDetailsSercice;
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {

	
		http.csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
		
	
		.disable().authorizeRequests().antMatchers("/").permitAll()
		.antMatchers("/usuario/doador").permitAll()
		.antMatchers("/usuario/admin").permitAll()
		.antMatchers("/candidato/salva-candidatos").hasRole("ADMIN") 
		.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
		.antMatchers("/candidato/**").permitAll()
		
		.anyRequest().authenticated().and().logout().logoutSuccessUrl("/index")
		
		.logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		
		.and().addFilterBefore(new JWTLoginFilter("/login", authenticationManager()), 
									UsernamePasswordAuthenticationFilter.class)
		
		.addFilterBefore(new JwtApiAutenticacaoFilter(), UsernamePasswordAuthenticationFilter.class);
	
	}
	
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
	auth.userDetailsService(implementacaoUserDetailsSercice)
	.passwordEncoder(new BCryptPasswordEncoder());
	
	}

}
