import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ChartistModule } from 'ng-chartist';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { ResumeViewComponent } from './resume-view/resume-view.component';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';
import { FormsModule } from '@angular/forms';
import { CandidateeditoneComponent } from './candidateeditone/candidateeditone.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        ChartistModule,
        NgbModule,FormsModule,
        MatchHeightModule
    ],
    exports: [],
    declarations: [
        Dashboard1Component,
        Dashboard2Component,Dashboard3Component, ResumeViewComponent, ResumeUploadComponent,CandidateeditoneComponent
    ],
    providers: [],
})
export class DashboardModule { }
