import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { ViewJobComponent } from './view-job/view-job.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateJobsComponent,
        data: {
          title: 'create-client'
        }
      },
      {
        path: 'list',
        component: JobsListComponent,
        data: {
          title: 'client-list'
        }
      },
      {
        path: 'edit',
        component: EditJobsComponent,
        data: {
          title: 'client-edit'
        }
      },
      {
        path: 'view',
        component: ViewJobComponent,
        data: {
          title: 'client-view'
        }
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
