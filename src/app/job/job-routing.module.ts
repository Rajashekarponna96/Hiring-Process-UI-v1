import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateJobComponent } from './create-job/create-job.component';
import { ListJobComponent } from './list-job/list-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';

const routes: Routes = [ {
  path: '',
  children: [
    {
      path: 'Createjob',
      component: CreateJobComponent,
      data: {
        title: 'Grids'
      }
    },
    {
      path: 'Listjob',
      component: ListJobComponent,
      data: {
        title: 'Grids'
      }
    },

    {
      path: 'Editjob',
      component: EditJobComponent,
      data: {
        title: 'Simple Line'
      }
    },

  ]
}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobRoutingModule { }
