import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { ListJobComponent } from './list-job/list-job.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateJobComponent, EditJobComponent, ListJobComponent],
  imports: [
    CommonModule, FormsModule,
    JobRoutingModule
  ]
})
export class JobModule { }
