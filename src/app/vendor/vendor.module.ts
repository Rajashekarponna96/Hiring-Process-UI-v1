import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorRoutingModule } from './vendor-routing.module';
import { VendorListComponent } from './vendor-list/vendor-list.component';
import { CreateVendorComponent } from './create-vendor/create-vendor.component';
import { EditVendorComponent } from './edit-vendor/edit-vendor.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [VendorListComponent, CreateVendorComponent, EditVendorComponent],
  imports: [
    CommonModule,
    VendorRoutingModule,FormsModule,
  ]
})
export class VendorModule { }
