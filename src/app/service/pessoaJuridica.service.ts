import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';

@Injectable()
export class PessoaJuridicaService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:44370/api/pessoasJuridicas';

    obterTodos() {
        return this.http.get<Cliente[]>(this.baseUrl);
    }

    obterPorId(id: any) {
        return this.http.get<Cliente>(this.baseUrl + '/' + id);
    }

    adicionar(cliente: Cliente) {
        return this.http.post(this.baseUrl, cliente);
    }

    editar(cliente: Cliente) {
        return this.http.put(this.baseUrl + '/' + cliente.id, cliente);
    }

    excluir(id: any) {
        return this.http.delete(this.baseUrl + '/' + id);
    }
}
