import { Telefone } from "./telefone.model";
import { ClassificacaoEnum } from "../enum/classificacao.enum";

export abstract class Pessoa {
    id: number;
    nome: string;
    email: string;
    cep: string;
    classificacao: ClassificacaoEnum;
    telefones: Telefone[];
}