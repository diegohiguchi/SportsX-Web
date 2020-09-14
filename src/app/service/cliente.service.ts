import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente.model';

@Injectable()
export class ClienteService {
    constructor(private http: HttpClient) { }
    baseUrl: string = 'https://localhost:44370/api/clientes';

    obterClientes() {
        return this.http.get<Cliente[]>(this.baseUrl);
    }
}
