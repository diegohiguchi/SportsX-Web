import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app.routing.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgxMaskModule } from 'ngx-mask';

import { AppComponent } from './app.component';
import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ClienteService } from './service/cliente.service';
import { PessoaFisicaService } from './service/pessoaFisica.service';
import { PessoaJuridicaService } from './service/pessoaJuridica.service';
import { SearchPipe } from './search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AdicionarClienteComponent,
    ListarClienteComponent,
    EditarClienteComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    FormsModule
  ],
  providers: [ClienteService, PessoaFisicaService, PessoaJuridicaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
