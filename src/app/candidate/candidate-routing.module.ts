import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateCandidateComponent,
        data: {
          title: 'Dashboard 1'
        }
      },
      {
        path: 'list',
        component: ListCandidateComponent,
        data: {
          title: 'Dashboard 2'
        }
      },
      {
        path: 'edit',
        component: EditCandidateComponent,
        data: {
          title: 'Dashboard 3'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidateRoutingModule { }
