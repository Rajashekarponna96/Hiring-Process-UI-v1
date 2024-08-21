import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecruiterListComponent } from './recruiter-list/recruiter-list.component';
import { CreateRecruiterComponent } from './create-recruiter/create-recruiter.component';
import { EditRecruiterComponent } from './edit-recruiter/edit-recruiter.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateRecruiterComponent,
        data: {
          title: 'create-recruiter'
        }
      },
      {
        path: 'list',
        component: RecruiterListComponent,
        data: {
          title: 'recruiter-list'
        }
      },
      {
        path: 'edit',
        component: EditRecruiterComponent,
        data: {
          title: 'recruiter-edit'
        }
      },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
