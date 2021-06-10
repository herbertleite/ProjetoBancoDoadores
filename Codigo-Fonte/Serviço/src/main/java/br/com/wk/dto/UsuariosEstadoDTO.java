package br.com.wk.dto;

public class UsuariosEstadoDTO {


	    private Integer quantidadeCandidatos;
	    private String estado;
		
	    public UsuariosEstadoDTO(Integer quantidadeCandidatos, String estado) {
			this.quantidadeCandidatos = quantidadeCandidatos;
			this.estado = estado;
		}

		public Integer getQuantidadeCandidatos() {
			return quantidadeCandidatos;
		}

		public void setQuantidadeCandidatos(Integer quantidadeCandidatos) {
			this.quantidadeCandidatos = quantidadeCandidatos;
		}

		public String getEstado() {
			return estado;
		}

		public void setEstado(String estado) {
			this.estado = estado;
		}
	    
	    
	    
	    
}
