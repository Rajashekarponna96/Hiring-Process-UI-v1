import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'app/shared/hiring-process-services/vendor.service';
import { Pagination } from 'app/shared/model/pagination';
import { Vendor } from 'app/shared/model/vendor';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.scss']
})
export class VendorListComponent implements OnInit {
  vendors: Vendor[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;
  constructor(
    private vendorService: VendorService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllVendorList();
  }

  getAllVendorList() {
    this.vendorService.getVendorListWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data: any) => { // Ensure data is of correct type
        this.vendors = data.content;
        this.totalElements = data.totalElements; // Assign total elements
        this.totalPages = data.totalPages; // Assign total pages
        this.pagination = data;
      });
  }

  navigateToCreateVendor() {
    this.router.navigate(['vendor/create']);
  }

  handleEditVendor(vendor: Vendor, vendorId: number) {
    this.router.navigate(['/vendor/edit'], { state: { vendorId: vendorId, vendor: vendor } });
  }

  vendorDelete(vendor: Vendor) {
    console.log("vendor id is:" + vendor.id);
    this.vendorService.deleteVendor(vendor.id)
      .subscribe(
        (res) => {
          console.log(res);
          this.getAllVendorList();
        },
        (err) => {
          console.error('Error occurred while deleting vendor:', err);
        }
      );
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllVendorList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllVendorList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllVendorList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllVendorList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to first page when changing page size
    this.getAllVendorList();
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);

    this.vendorService.searchVendorByCode(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data: any) => { // Ensure data is of correct type
        this.vendors = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
      });
  }
}
