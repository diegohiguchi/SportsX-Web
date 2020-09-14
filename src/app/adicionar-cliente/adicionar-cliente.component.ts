import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente.model';
import { PessoaFisicaService } from '../service/pessoaFisica.service';
import { PessoaJuridicaService } from '../service/pessoaJuridica.service';

@Component({
  selector: 'app-adicionar-cliente',
  templateUrl: './adicionar-cliente.component.html',
  styleUrls: ['./adicionar-cliente.component.css']
})
export class AdicionarClienteComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pessoaFisicaService: PessoaFisicaService,
    private pessoaJuridicaService: PessoaJuridicaService) {
  }

  clienteForm: FormGroup;
  telefones: FormArray;

  ngOnInit() {
    this.clienteForm = this.formBuilder.group({
      id: [],
      pessoa: ['', Validators.required],
      nome: ['', Validators.required],
      cep: ['', Validators.required],
      cpf: [''],
      cnpj: [''],
      razaoSocial: [''],
      email: ['', Validators.required],
      classificacao: ['', Validators.required],
      telefones: this.formBuilder.array([this.criarTelefone()])
    });
  }

  criarTelefone(): FormGroup {
    return this.formBuilder.group({
      numero: '',
    });
  }

  adicionarTelefone(): void {
    this.telefones = this.clienteForm.get('telefones') as FormArray;
    this.telefones.push(this.criarTelefone());
  }

  removerTelefone(i: number) {
    this.telefones.removeAt(i);
  }

  onSubmit() {
    const cliente = new Cliente();
    cliente.nome = this.clienteForm.controls['nome'].value;
    cliente.email = this.clienteForm.controls['email'].value;
    cliente.cpf = this.clienteForm.controls['cpf'].value;
    cliente.cep = this.clienteForm.controls['cep'].value;
    cliente.classificacao = +this.clienteForm.controls['classificacao'].value;
    cliente.telefones = this.clienteForm.controls['telefones'].value;
    cliente.cnpj = this.clienteForm.controls['cnpj'].value;
    cliente.razaoSocial = this.clienteForm.controls['razaoSocial'].value;

    if (cliente.cnpj !== "" && cliente.cnpj !== null && cliente.cnpj !== undefined)
      this.adicionarPessoaJuridica(cliente);
    else
      this.adicionarPessoaFisica(cliente);

  }

  adicionarPessoaFisica(cliente: Cliente) {
    this.pessoaFisicaService.adicionar(cliente)
      .subscribe(data => {
        this.router.navigate(['']);
      },
        error => {
          alert(error);
        });
  }

  adicionarPessoaJuridica(cliente: Cliente) {
    this.pessoaJuridicaService.adicionar(cliente)
      .subscribe(data => {
        this.router.navigate(['']);
      },
        error => {
          alert(error);
        });
  }

  mostrarCampos(pessoa: number) {
    if (pessoa === 1) {
      this.clienteForm.controls['cnpj'].setValue(null);
      this.clienteForm.controls['razaoSocial'].setValue(null);
      this.clienteForm.controls['cnpj'].clearValidators();
      this.clienteForm.controls['razaoSocial'].clearValidators();
    } else {
      this.clienteForm.controls['cpf'].setValue(null);
      this.clienteForm.controls['cpf'].clearValidators();
    }
  }
}
