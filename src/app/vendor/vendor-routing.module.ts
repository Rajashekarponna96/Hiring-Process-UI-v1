import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateVendorComponent,
        data: {
          title: 'create-recruiter'
        }
      },
      {
        path: 'list',
        component: VendorListComponent,
        data: {
          title: 'recruiter-list'
        }
      },
      {
        path: 'edit',
        component: EditVendorComponent,
        data: {
          title: 'recruiter-edit'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
