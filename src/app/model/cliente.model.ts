import { Telefone } from "./telefone.model";
import { ClassificacaoEnum } from "../enum/classificacao.enum";

export class Cliente {
    id: number;
    nome: string;
    email: string;
    cpf?: string;
    cep: string;
    razaoSocial?: string;
    cnpj?: string;
    classificacao: ClassificacaoEnum;
    telefones: Telefone[];
}  
