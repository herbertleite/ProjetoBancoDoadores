export class AppConstants {

	public static get baseServidor(): string { return "http://localhost:8080/" }

	public static get baseLogin(): string { return this.baseServidor + "wk/login" }

	public static get baseUrlUsuario(): string {return this.baseServidor + "wk/usuario/"}

  public static get baseUrlCandidato(): string {return this.baseServidor + "wk/candidato/"}


}
