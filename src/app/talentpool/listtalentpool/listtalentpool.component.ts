import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TalentpoolService } from 'app/shared/hiring-process-services/talentpool.service';
import { Pagination } from 'app/shared/model/pagination';
import { TalentPoolOne } from 'app/shared/model/talentpoolone';

@Component({
  selector: 'app-listtalentpool',
  templateUrl: './listtalentpool.component.html',
  styleUrls: ['./listtalentpool.component.scss']
})
export class ListtalentpoolComponent implements OnInit {

  talentPools: TalentPoolOne[] = [];
  selectedRecordsOption1: number = 5;
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;

  constructor(
      private talentpoolService: TalentpoolService,
      private changeDetectorRefs: ChangeDetectorRef,
      private router: Router
  ) { }

  ngOnInit() {
      this.getAllTalentPools();
      this.getAllTalentPoolList();
  }

  getAllTalentPools() {
      this.talentpoolService.getTalentPoolList()
          .subscribe((data) => {
              console.log(data);
              this.talentPools = data;
              this.changeDetectorRefs.markForCheck();
          });
  }

  onGlobalFilter() {

  }

  onGlobalFilter1(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const inputValue = inputElement.value;
      console.log('Input Value:', inputValue);

      this.talentpoolService.searchTalentPools(inputValue, 0, this.selectedRecordsOption1)
          .subscribe((data) => {
              this.talentPools = data.content;
              this.totalElements = data.totalElements;
              this.totalPages = data.totalPages;
              this.currentPage = 0; // Reset to first page
              this.changeDetectorRefs.markForCheck();
          });
  }

  getAllTalentPoolList() {
      this.talentpoolService.getTalentPoolListWithPagination(this.currentPage, this.selectedRecordsOption1)
          .subscribe((data) => {
              this.talentPools = data.content;
              this.pagination = data;
              this.totalElements = data.totalElements;
              this.totalPages = data.totalPages;
              this.changeDetectorRefs.markForCheck();
          });
  }

  navigateToCreateTalentPool() {
      this.router.navigate(['/talentpool/Createtalentpool']);
  }

  handleEditTalentPool(talentPool: TalentPoolOne) {
      this.router.navigate(['/talentpool/Edittalentpool'], { state: { talentPool: talentPool } });
  }

  talentpooldelete(talentPool: TalentPoolOne) {
      this.talentpoolService.deleteTalentPool(talentPool.id)
          .subscribe(
              res => {
                  console.log(res);
                  this.getAllTalentPoolList();
              },
              (err: HttpErrorResponse) => {
                  if (err.error instanceof Error) {
                      console.error("Client-side error occurred:", err.error.message);
                  } else {
                      console.error("Server-side error occurred:", err.status, err.message);
                  }
              });
  }

  goToFirstPage() {
      this.currentPage = 0;
      this.getAllTalentPoolList();
  }

  goToPreviousPage() {
      if (this.currentPage > 0) {
          this.currentPage--;
          this.getAllTalentPoolList();
      }
  }

  goToNextPage() {
      if (this.currentPage < this.totalPages - 1) {
          this.currentPage++;
          this.getAllTalentPoolList();
      }
  }

  goToLastPage() {
      this.currentPage = this.totalPages - 1;
      this.getAllTalentPoolList();
  }

  onRecordsPerPageChange(event: Event) {
      this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
      this.currentPage = 0; // Reset to first page when changing page size
      this.getAllTalentPoolList();
  }
}

