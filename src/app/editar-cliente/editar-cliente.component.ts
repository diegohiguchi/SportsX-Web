import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente.model';
import { Telefone } from '../model/telefone.model';
import { PessoaFisicaService } from '../service/pessoaFisica.service';
import { PessoaJuridicaService } from '../service/pessoaJuridica.service';


@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private pessoaFisicaService: PessoaFisicaService,
    private pessoaJuridicaService: PessoaJuridicaService,
    private route: ActivatedRoute) {
  }

  id: any;
  cliente: Cliente;
  clienteForm: FormGroup;
  telefones: FormArray;
  formTelefone: any[] = [];

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    let pessoa = this.route.snapshot.url[2].path;

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
      telefones: this.formBuilder.array([this.criarTelefone(null)])
    });

    if (pessoa === 'pessoa-fisica')
      this.obterPorPessoaFisica();
    else
      this.obterPorPessoaJuridica();
  }

  obterPorPessoaFisica() {
    this.pessoaFisicaService.obterPorId(this.id)
      .subscribe(data => {
        this.cliente = data;
        this.popularFormulario(this.cliente);
      });
  }

  obterPorPessoaJuridica() {
    this.pessoaJuridicaService.obterPorId(this.id)
      .subscribe(data => {
        this.cliente = data;
        this.popularFormulario(this.cliente);
      });
  }

  popularFormulario(cliente: Cliente) {
    if (cliente.cnpj !== null && cliente.cnpj !== undefined)
      this.clienteForm.controls['pessoa'].setValue(2);
    else
      this.clienteForm.controls['pessoa'].setValue(1);

    this.clienteForm.controls['nome'].setValue(cliente.nome);
    this.clienteForm.controls['cep'].setValue(cliente.cep);
    this.clienteForm.controls['cpf'].setValue(cliente.cpf);
    this.clienteForm.controls['email'].setValue(cliente.email);
    this.clienteForm.controls['classificacao'].setValue(cliente.classificacao);
    this.clienteForm.controls['cnpj'].setValue(cliente.cnpj);
    this.clienteForm.controls['razaoSocial'].setValue(cliente.razaoSocial);

    cliente.telefones.forEach((telefone, index) => {
      this.adicionarTelefone(telefone);
    });
  }

  criarTelefone(telefone?: Telefone): FormGroup {
    return this.formBuilder.group({
      numero: (telefone !== null && telefone !== undefined) ? telefone.numero : '',
    });
  }

  adicionarTelefone(telefone?: Telefone): void {
    this.telefones = this.clienteForm.get('telefones') as FormArray;
    this.telefones.push(this.criarTelefone(telefone));
  }

  removerTelefone(i: number) {
    this.telefones.removeAt(i);
  }

  onSubmit() {
    const cliente = new Cliente();
    cliente.id = this.id;
    cliente.nome = this.clienteForm.controls['nome'].value;
    cliente.email = this.clienteForm.controls['email'].value;
    cliente.cpf = this.clienteForm.controls['cpf'].value;
    cliente.cep = this.clienteForm.controls['cep'].value;
    cliente.classificacao = +this.clienteForm.controls['classificacao'].value;
    cliente.cnpj = this.clienteForm.controls['cnpj'].value;
    cliente.razaoSocial = this.clienteForm.controls['razaoSocial'].value;
    cliente.telefones = this.clienteForm.controls['telefones'].value;
    cliente.telefones = cliente.telefones.filter(x => x.numero !== "");

    if (cliente.cnpj !== "" && cliente.cnpj !== null && cliente.cnpj !== undefined)
      this.editarPessoaJuridica(cliente);
    else
      this.editarPessoaFisica(cliente);
  }

  editarPessoaFisica(cliente: Cliente) {
    this.pessoaFisicaService.editar(cliente)
      .subscribe(data => {
        this.router.navigate(['']);
      },
        error => {
          alert(error);
        });
  }

  editarPessoaJuridica(cliente: Cliente) {
    this.pessoaJuridicaService.editar(cliente)
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
