import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmailtemplateService } from 'app/shared/hiring-process-services/emailtemplateervice.service';
import { CandidateEmail } from 'app/shared/model/candidateEmail';
import { Pagination } from 'app/shared/model/pagination';

@Component({
  selector: 'app-email-template-list',
  templateUrl: './email-template-list.component.html',
  styleUrls: ['./email-template-list.component.scss']
})
export class EmailTemplateListComponent implements OnInit {

  candidateEmails: CandidateEmail[] = [];
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;

  constructor(
    private router: Router,
    private emailService: EmailtemplateService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllEmailList();
    this.getAllEmailTemplateList();
  }

  getAllEmailList() {
    this.emailService.getEmailList().subscribe(
      (data) => {
        console.log(data);
        this.candidateEmails = data;
        this.changeDetectorRefs.markForCheck();
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching email list:', err);
      }
    );
  }


  getAllEmailTemplateList() {
    this.emailService.getEmailTemplateListWithPagination(this.currentPage, this.selectedRecordsOption1).subscribe(
      (data: Pagination) => { // Ensure proper typing here
        this.candidateEmails = data.content || []; // Use empty array as fallback
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      },
      (err: HttpErrorResponse) => {
        console.error('Error fetching email template list:', err);
      }
    );
  }


  navigateToCreateEmail() {
    this.router.navigate(['createemail']);
  }

  handleEditEmail(candidateEmail: CandidateEmail) {
    const candidateEmailId = candidateEmail.id;
    this.router.navigate(['/email-template/edit'], { state: { candidateEmailId: candidateEmailId, candidateEmail: candidateEmail } });
  }

  EmailDelete(candidateEmail: CandidateEmail) {
    console.log("email id is:" + candidateEmail.id);
    this.emailService.deleteEmail(candidateEmail.id).subscribe(
      (res) => {
        console.log(res);
        this.getAllEmailTemplateList();
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

  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.emailService.searchEmail(inputValue, 0, this.selectedRecordsOption1).subscribe(
      (data) => {
        this.candidateEmails = data.content;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
        this.changeDetectorRefs.markForCheck();
      },
      (err: HttpErrorResponse) => {
        console.error('Error searching email:', err);
      }
    );
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getAllEmailTemplateList();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getAllEmailTemplateList();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getAllEmailTemplateList();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getAllEmailTemplateList();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0; // Reset to first page when changing page size
    this.getAllEmailTemplateList();
  }

}
