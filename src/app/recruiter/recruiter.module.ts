import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { RecruiterListComponent } from './recruiter-list/recruiter-list.component';
import { CreateRecruiterComponent } from './create-recruiter/create-recruiter.component';
import { EditRecruiterComponent } from './edit-recruiter/edit-recruiter.component';


@NgModule({
  declarations: [RecruiterListComponent, CreateRecruiterComponent, EditRecruiterComponent],
  imports: [
    CommonModule,
    RecruiterRoutingModule
  ]
})
export class RecruiterModule { }
