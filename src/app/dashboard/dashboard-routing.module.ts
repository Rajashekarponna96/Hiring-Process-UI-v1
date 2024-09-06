import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Dashboard1Component } from "./dashboard1/dashboard1.component";
import { Dashboard2Component } from "./dashboard2/dashboard2.component";
import { Dashboard3Component } from './dashboard3/dashboard3.component';
import { ResumeViewComponent } from './resume-view/resume-view.component';
import { ResumeUploadComponent } from './resume-upload/resume-upload.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard1',
        component: Dashboard1Component,
        data: {
          title: 'Dashboard 1'
        }
      },
      {
        path: 'dashboard2',
        component: Dashboard2Component,
        data: {
          title: 'Dashboard 2'
        }
      },
      {
        path: 'dashboard3',
        component: Dashboard3Component,
        data: {
          title: 'Dashboard 3'
        }
      },
      {
        path: 'resumeview',
        component: ResumeViewComponent,
        data: {
          title: 'resumeview'
        }
      },
      {
        path: 'resumeupload',
        component: ResumeUploadComponent,
        data: {
          title: 'resumeupload'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
