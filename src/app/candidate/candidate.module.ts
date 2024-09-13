import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CandidateRoutingModule } from './candidate-routing.module';
import { CreateCandidateComponent } from './create-candidate/create-candidate.component';
import { EditCandidateComponent } from './edit-candidate/edit-candidate.component';
import { ListCandidateComponent } from './list-candidate/list-candidate.component';
import { FormsModule } from '@angular/forms';
import { HiringflowactivityComponent } from './hiringflowactivity/hiringflowactivity.component';

@NgModule({
  declarations: [CreateCandidateComponent, EditCandidateComponent, ListCandidateComponent, HiringflowactivityComponent],
  imports: [
    CommonModule,
    CandidateRoutingModule,FormsModule,
  ]
})
export class CandidateModule { }
