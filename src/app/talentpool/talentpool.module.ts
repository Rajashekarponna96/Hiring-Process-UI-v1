import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentpoolRoutingModule } from './talentpool-routing.module';
import { CreatetalentpoolComponent } from './createtalentpool/createtalentpool.component';
import { ListtalentpoolComponent } from './listtalentpool/listtalentpool.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';
import { EditTalentpoolComponent } from './edit-talentpool/edit-talentpool.component';

@NgModule({
  declarations: [CreatetalentpoolComponent,ListtalentpoolComponent, EditTalentpoolComponent],
  imports: [
    CommonModule,
    TalentpoolRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatchHeightModule,
  ]
})
export class TalentpoolModule { }
