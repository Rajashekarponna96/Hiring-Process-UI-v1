import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TalentpooloneRoutingModule } from './talentpoolone-routing.module';
import { Talentpool1Component } from './talentpool1/talentpool1.component';
import { Talentpool2Component } from './talentpool2/talentpool2.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from 'app/shared/directives/match-height.directive';

@NgModule({

  imports: [
    CommonModule, NgbModule,
    MatchHeightModule,
    TalentpooloneRoutingModule,
  ], exports: [], declarations: [Talentpool1Component, Talentpool2Component], providers: [],
})


// @NgModule({
//   imports: [
//       CommonModule,
//       DashboardRoutingModule,
//       ChartistModule,
//       NgbModule,
//       MatchHeightModule
//   ],
//   exports: [],
//   declarations: [
//       Dashboard1Component,
//       Dashboard2Component
//   ],
//   providers: [],
// })
export class TalentpooloneModule { }
