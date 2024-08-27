import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from 'app/shared/hiring-process-services/recruiter.service';
import { Pagination } from 'app/shared/model/pagination';
import { Recruiter } from 'app/shared/model/recruiter';

@Component({
  selector: 'app-recruiter-list',
  templateUrl: './recruiter-list.component.html',
  styleUrls: ['./recruiter-list.component.scss']
})
export class RecruiterListComponent implements OnInit {

  recruiter: Recruiter = new Recruiter();
  recruiters: Recruiter[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router,
    private recruiterService: RecruiterService
  ) { }

  ngOnInit() {
    this.getAllRecruiter();
    this.getAllRecruiterList();
    const recruiter = history.state.recruiter;

    if (recruiter) {
      console.log('Recruiter object received:', recruiter);
      this.recruiter = recruiter;
    } else {
      console.error('Recruiter data is missing in state.');
    }
  }

  getRecruiterList() {
    this.recruiterService.getRecruiterList().subscribe(
      (data: Recruiter[]) => {
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiters:', error.message);
      }
    );
  }

  getAllRecruiter() {
    this.getRecruiterList();
  }

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.recruiterService.searchRecruiters(inputValue, 0, this.selectedRecordsOption1).subscribe(
      (data) => {
        this.recruiters = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0;
        this.changeDetectorRefs.markForCheck();
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching recruiters:', error.message);
      }
    );
  }

  handleEditRecruiter(recruiter: Recruiter) {
    console.log('Recruiter object to edit:', recruiter);
    this.router.navigate(['recruiter/edit'], { state: { recruiter: recruiter } });
  }

  getAllRecruiterList() {
    this.recruiterService.getRecruiterListWithPagination(this.currentPage, this.selectedRecordsOption1).subscribe(
      (data) => {
        this.recruiters = data.content;
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiters with pagination:', error.message);
      }
    );
  }

  navigateToCreateRecruiter() {
    this.router.navigate(['recruiter/create']);
  }

  recruiterdelete(recruiter: Recruiter) {
    this.recruiterService.deleteRecruiter(recruiter.id).subscribe(
      (res) => {
        console.log(res);
        this.getAllRecruiterList();
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occurred.');
        } else {
          console.log('Server-side error occurred.');
        }
      }
    );
  }

  confirmDelete(recruiter: Recruiter) {
    
        this.recruiterdelete(recruiter);
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllRecruiterList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllRecruiterList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllRecruiterList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllRecruiterList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getAllRecruiterList();
  }
}
