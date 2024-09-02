import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'app/shared/hiring-process-services/vendor.service';
import { Vendor } from 'app/shared/model/vendor';

@Component({
  selector: 'app-create-vendor',
  templateUrl: './create-vendor.component.html',
  styleUrls: ['./create-vendor.component.scss']
})
export class CreateVendorComponent implements OnInit {

  constructor(
    private router: Router,
    private vendorService: VendorService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  showPocsFields: boolean = false;
  vendor: Vendor = new Vendor();

  addVendor() {
    this.vendorService.addVendor(this.vendor).subscribe(
      res => {
        console.log('Vendor added successfully:', res);
        this.router.navigate(['/vendor/list']);
      },
      error => {
        console.error('Error occurred while adding vendor:', error);
      }
    );
  }

  cancel(){
    this.router.navigate(['/vendor/list']);
  }

  ngOnInit() {
  }
}


