import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './upload-file/upload-file.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: UploadFileComponent,
        data: {
          title: 'upload file'
        }
      }
     
      
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFileRoutingModule { }
