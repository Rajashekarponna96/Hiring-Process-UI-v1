import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientListComponent } from './client-list/client-list.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { EditClientComponent } from './edit-client/edit-client.component';

@NgModule({
  declarations: [ClientListComponent, CreateClientComponent, EditClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule
  ]
})
export class ClientModule { }
