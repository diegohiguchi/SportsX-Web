import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AdicionarClienteComponent } from './adicionar-cliente/adicionar-cliente.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { ListarClienteComponent } from './listar-cliente/listar-cliente.component';

const routes: Routes = [
    { path: '', component: ListarClienteComponent, pathMatch: 'full' },
    { path: 'adicionar-cliente', component: AdicionarClienteComponent },
    { path: 'editar-cliente/:id/pessoa-fisica', component: EditarClienteComponent },
    { path: 'editar-cliente/:id/pessoa-juridica', component: EditarClienteComponent },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule { }  