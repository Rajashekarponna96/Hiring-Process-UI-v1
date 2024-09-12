import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Candidate4Service } from 'app/shared/hiring-process-services/candidate4.service';
import { Candidate } from 'app/shared/model/candidate';
import { Pagination } from 'app/shared/model/pagination';
import { UserAccout } from 'app/shared/model/userAccount';
import { Vendor } from 'app/shared/model/vendor';

@Component({
  selector: 'app-list-candidate',
  templateUrl: './list-candidate.component.html',
  styleUrls: ['./list-candidate.component.scss']
})
export class ListCandidateComponent implements OnInit {
  // No longer using Table from PrimeNG
  @ViewChild('dt', { static: false }) dataTable!: ElementRef;

  submitted: boolean = false;
  productDialog: boolean = false;
  fetchedCandidateStage!: string;
  pagination!: Pagination;
  totalElements: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  selectedRecordsOption1: number = 5;
  message: string = '';
  selectedFile: any;
  selectedFile1!: any;
  isCandidateLoggedIn: boolean = false;
  isAdmin: boolean = false;
  isRecruiter: boolean = false;
  isVendor: boolean = false;

  candidate: Candidate = new Candidate();
  candidate1!: Candidate;
  selectededCandidate!: Candidate;
  candidates: Candidate[] = [];
  filteredCandidates: Candidate[] = [];
  displayFilterFields = false;
  temporaryStage!: string;
  vendor!: Vendor;
  showStages: boolean = false;

  stages: string[] = ['Sourced', 'Screening', 'Interview', 'Preboarding', 'Hired', 'Archived', 'Hold', 'Reject'];

  constructor(
    private router: Router,
    private http: HttpClient,
    private changeDetectorRefs: ChangeDetectorRef,
    private candidateService: Candidate4Service
  ) { }

  ngOnInit() {
    this.getvendorDetailsById();
  }

  navigateToCreateCandidate() {
    this.router.navigate(['/forms/archwizard']);
  }


  onGlobalFilter(event: Event) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.getAllCandidatesListForGlobalFilter(inputValue);
  }

  getAllCandidatesListForGlobalFilter(inputValue: any) {
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content || [];
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllCandidateList() {
    this.candidateService.getCandidatesWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content || [];
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  handleEditcandidate(candidate: Candidate) {
    const candidateId = candidate.id;
    this.router.navigate(['/dashboard/caneditone'], { state: { candidateId: candidateId, candidate: candidate } });
  }

  candidateDelete(candidate: Candidate) {
    this.candidateService.deleteCandidate(candidate.id)
      .subscribe(
        (res) => {
          this.getAllCandidateList();
        },
        (err: HttpErrorResponse) => {
          console.error('Error:', err.message);
        }
      );
  }

  openHiringFlow(candidate: Candidate) {
    localStorage.setItem('candidateid', JSON.stringify(candidate.id));
    this.router.navigate(['hiringflowactivity']);
  }

  toggleStages() {
    this.showStages = !this.showStages;
  }

  openNew(candidate: Candidate) {
    this.selectededCandidate = candidate;
    this.temporaryStage = candidate.stage;
    this.submitted = false;
    this.productDialog = true;
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  // toggleFilter() {
  //   this.displayFilterFields = !this.displayFilterFields;
  //   if (!this.displayFilterFields) {
  //     // Manually reset your filter fields if necessary
  //     this.filteredCandidates = [...this.candidates];
  //   }
  // }
  toggleFilter() {
    this.displayFilterFields = !this.displayFilterFields;
    if (!this.displayFilterFields) {
      // Manually reset your filter fields if necessary
      this.filteredCandidates = this.candidates.slice(); // Using slice to clone the array
    }
  }


  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    this.getAllCandidatesListForGlobalFilter(inputValue);
  }

  updateCandidate(candidate: Candidate, stage: string) {
    candidate.stage = stage;
    this.hideDialog();
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    candidate.modifiedBy = user;

    this.candidateService.updateCandidate(candidate).subscribe(
      () => {
        this.productDialog = false;
        this.submitted = false;
      },
      (err: HttpErrorResponse) => {
        console.error('Error:', err.message);
      }
    );
  }

  getvendorDetailsById() {
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

    if (user.role.name === 'vendor') {
      this.isVendor = true;
      this.candidateService.getVendorByUserId(user.id)
        .subscribe(
          (data) => {
            this.vendor = data;
            this.getCandidatesByVendorId(this.vendor.id);
          },
          (err: HttpErrorResponse) => {
            console.error('Error fetching vendor details:', err.message);
          }
        );
    } else if (user.role.name === 'admin') {
      this.isAdmin = true;
      this.getAllCandidateList();
    } else if (user.role.name === 'recruiter') {
      this.isRecruiter = true;
      this.getAllCandidateList();
    } else if (user.role.name === 'candidate') {
      this.isCandidateLoggedIn = true;
      this.getCandidatesByCandidateId(user.id);
    }
  }

  getCandidatesByVendorId(vendorId: any) {
    this.candidateService.getCandidatesByVendorId(vendorId, this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content || [];
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getCandidatesByCandidateId(candidateId: any) {
    this.candidateService.getCandidateByUserId(candidateId)
      .subscribe(
        (data) => {
          this.candidate1 = data;
        },
        (err: HttpErrorResponse) => {
          console.error('Error fetching candidate details:', err.message);
        }
      );
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getvendorDetailsById();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getvendorDetailsById();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getvendorDetailsById();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getvendorDetailsById();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getvendorDetailsById();
  }
}
