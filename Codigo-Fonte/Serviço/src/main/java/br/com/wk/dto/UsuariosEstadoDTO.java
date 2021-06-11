package br.com.wk.dto;

import java.io.Serializable;

public class UsuariosEstadoDTO implements Serializable{


	    private Long quantidadeCandidatos;
	    private String estado;
	    
	    public UsuariosEstadoDTO(Long quantidadeCandidatos, String estado) {
			super();
			this.quantidadeCandidatos = quantidadeCandidatos;
			this.estado = estado;
		}
	    

		public Long getQuantidadeCandidatos() {
			return quantidadeCandidatos;
		}

		public void setQuantidadeCandidatos(Long quantidadeCandidatos) {
			this.quantidadeCandidatos = quantidadeCandidatos;
		}

		

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}
	    
	    
	    
	    
}
