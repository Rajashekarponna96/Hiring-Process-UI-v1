import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { VendorService } from 'app/shared/hiring-process-services/vendor.service';
import { Poc } from 'app/shared/model/poc';
import { Vendor } from 'app/shared/model/vendor';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.scss']
})
export class EditVendorComponent {

  // @ViewChild("editVendorForm")



  @ViewChild("editVendorForm", { static: false }) editVendorForm!: NgForm;
  // editVendorForm!: NgForm;

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor();
  editedPocIndex: number | null = null;
  editedPoc: Poc = new Poc();
  vendorPocs: Poc[] = [];

  // Other methods...

  updateVendor() {
    this.vendorService.updateVendor(this.vendor).subscribe(
      res => {
        console.log('Vendor updated successfully:', res);
        this.router.navigate(['/vendor-list']);
      },
      error => {
        console.error('Error occurred while updating vendor:', error);
      }
    );
  }

  ngOnInit() {
    const stateData = history.state || {};
    const vendor = stateData.vendor;

    if (vendor) {
      this.vendor = vendor;
    } else {
      console.error('Vendor data is missing in state.');
    }
  }
}