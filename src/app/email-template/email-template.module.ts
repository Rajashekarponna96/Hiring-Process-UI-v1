import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailTemplateRoutingModule } from './email-template-routing.module';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { CreateEmailTemplateComponent } from './create-email-template/create-email-template.component';
import { EditEmailTemplateComponent } from './edit-email-template/edit-email-template.component';

@NgModule({
  declarations: [EmailTemplateListComponent, CreateEmailTemplateComponent, EditEmailTemplateComponent],
  imports: [
    CommonModule,
    EmailTemplateRoutingModule
  ]
})
export class EmailTemplateModule { }
