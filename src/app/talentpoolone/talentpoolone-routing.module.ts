import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Talentpool1Component } from './talentpool1/talentpool1.component';
import { Talentpool2Component } from './talentpool2/talentpool2.component';

const routes: Routes = [{
  path: '',
  children: [
    {
      path: 'talent1',
      component: Talentpool1Component,
      data: {
        title: 'talent 1'
      }
    },
    {
      path: 'talent2',
      component: Talentpool2Component,
      data: {
        title: 'talent 2'
      }
    },
  ]
}
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalentpooloneRoutingModule { }
