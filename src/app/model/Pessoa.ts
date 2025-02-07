import { Endereco } from "./Endereco";

export class Pessoa {
  id!: number;
  nome!: string;
  cpf!: string;
  telefone!: string;
  dataNascimento!: Date;
  endereco: Endereco = new Endereco();

}
