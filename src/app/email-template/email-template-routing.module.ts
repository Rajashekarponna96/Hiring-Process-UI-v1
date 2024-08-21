import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEmailTemplateComponent } from './create-email-template/create-email-template.component';
import { EmailTemplateListComponent } from './email-template-list/email-template-list.component';
import { EditEmailTemplateComponent } from './edit-email-template/edit-email-template.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateEmailTemplateComponent,
        data: {
          title: 'create-Email-Template'
        }
      },
      {
        path: 'list',
        component: EmailTemplateListComponent,
        data: {
          title: 'Email-Template-list'
        }
      },
      {
        path: 'edit',
        component: EditEmailTemplateComponent,
        data: {
          title: 'Email-Template-edit'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailTemplateRoutingModule { }
