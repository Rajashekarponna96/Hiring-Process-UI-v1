import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalentPoolOne } from 'app/shared/model/talentpoolone';
import { CreatetalentpoolComponent } from './createtalentpool/createtalentpool.component';
import { ListtalentpoolComponent } from './listtalentpool/listtalentpool.component';
import { EditTalentpoolComponent } from './edit-talentpool/edit-talentpool.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'Createtalentpool',
        component: CreatetalentpoolComponent,
        data: {
          title: 'Grids'
        }
      },
      {
        path: 'Listtalentpool',
        component: ListtalentpoolComponent,
        data: {
          title: 'Grids'
        }
      },

      {
        path: 'Edittalentpool',
        component: EditTalentpoolComponent,
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
export class TalentpoolRoutingModule { }
