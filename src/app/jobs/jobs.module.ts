import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobsRoutingModule } from './jobs-routing.module';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { JobsListComponent } from './jobs-list/jobs-list.component';
import { EditJobsComponent } from './edit-jobs/edit-jobs.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateJobsComponent, JobsListComponent, EditJobsComponent],
  imports: [
    CommonModule,
    FormsModule,
    JobsRoutingModule
  ]
})
export class JobsModule { }