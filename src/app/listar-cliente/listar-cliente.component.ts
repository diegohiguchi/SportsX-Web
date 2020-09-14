import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/cliente.model';
import { ClienteService } from '../service/cliente.service';
import { Router } from '@angular/router';
import { PessoaFisicaService } from '../service/pessoaFisica.service';
import { PessoaJuridicaService } from '../service/pessoaJuridica.service';
import { ClassificacaoEnum } from '../enum/classificacao.enum';

@Component({
  selector: 'app-listar-cliente',
  templateUrl: './listar-cliente.component.html',
  styleUrls: ['./listar-cliente.component.css']
})
export class ListarClienteComponent implements OnInit {

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService,
    private pessoaFisicaService: PessoaFisicaService,
    private pessoaJuridicaService: PessoaJuridicaService,
    private router: Router) { }

  ngOnInit() {
    this.clienteService.obterClientes()
      .subscribe((data: Cliente[]) => {
        this.clientes = data;
      });
  }

  adicionar(): void {
    this.router.navigate(['adicionar-cliente']);
  };

  editar(cliente: Cliente): void {
    if (cliente.cnpj !== null && cliente.cnpj !== undefined)
      this.router.navigate(['editar-cliente/' + cliente.id + '/pessoa-juridica']);
    else
      this.router.navigate(['editar-cliente/' + cliente.id + '/pessoa-fisica']);
  };

  excluir(cliente: Cliente): void {
    if (cliente.cnpj !== null && cliente.cnpj !== undefined)
      this.excluirPessoaJuridica(cliente);
    else
      this.excluirPessoaFisica(cliente);
  }

  excluirPessoaFisica(cliente: Cliente) {
    this.pessoaFisicaService.excluir(cliente.id)
      .subscribe(data => {
        this.clientes = this.clientes.filter(u => u !== cliente);
      });
  }

  excluirPessoaJuridica(cliente: Cliente) {
    this.pessoaJuridicaService.excluir(cliente.id)
      .subscribe(data => {
        this.clientes = this.clientes.filter(u => u !== cliente);
      });
  }

  obterClassificacao(classificacao: ClassificacaoEnum) {
    if (classificacao === ClassificacaoEnum.Ativo)
      return 'Ativo';
    else if (classificacao === ClassificacaoEnum.Inativo)
      return 'Inativo';
    else if (classificacao === ClassificacaoEnum.Preferencial)
      return 'Preferencial';
  }
}
