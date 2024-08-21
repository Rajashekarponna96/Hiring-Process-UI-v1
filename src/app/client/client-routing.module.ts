import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateClientComponent } from './create-client/create-client.component';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateClientComponent,
        data: {
          title: 'create-client'
        }
      },
      {
        path: 'list',
        component: ClientListComponent,
        data: {
          title: 'client-list'
        }
      },
      {
        path: 'edit',
        component: EditClientComponent,
        data: {
          title: 'client-edit'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
