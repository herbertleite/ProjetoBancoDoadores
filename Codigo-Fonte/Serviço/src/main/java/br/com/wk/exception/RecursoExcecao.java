package br.com.wk.exception;

import java.sql.SQLException;
import java.time.Instant;

import javax.servlet.http.HttpServletRequest;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class RecursoExcecao {
	
	@ExceptionHandler(EntidadeNaoEncontradaException.class)
	public ResponseEntity<?> EntidadeNaoEncontradaException(EntidadeNaoEncontradaException e,
			HttpServletRequest request) {
		String msg = e.getMessage();
		String error = "Não Localizado";
		HttpStatus status = HttpStatus.NOT_FOUND;
		ErroPadrao err = new ErroPadrao(Instant.now(), status.value(), error, msg, request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> MethodArgumentNotValidException(MethodArgumentNotValidException e,
			HttpServletRequest request) {
		String msg = e.getBindingResult().getFieldError().getDefaultMessage();
		String error = "Argumento Inválido";
		HttpStatus status = HttpStatus.BAD_REQUEST;
		ErroPadrao err = new ErroPadrao(Instant.now(), status.value(), error, msg, request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}


	@ExceptionHandler({ DataIntegrityViolationException.class, ConstraintViolationException.class, SQLException.class })
	public ResponseEntity<?> DataException(HttpServletRequest request,
			Exception e) {
		String msg = e.getCause().getCause().getMessage();
		String error = "Ops! Algo deu errado!";
		HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
		ErroPadrao err = new ErroPadrao(Instant.now(), status.value(), error, msg, request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}

}