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

  // @ViewChild('dt', { static: false }) dataTable!: Table;
  @ViewChild('dt', { static: false }) dataTable!: ElementRef;
  // @ViewChild('dt') dataTable!: Table;
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
  //menuitems: MenuItem[] = [];
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
    this.getVendorDetailsById();
  }

  navigateToCreateCandidate() {
    this.router.navigate(['/forms/archwizard']);
  }

  // onGlobalFilter(table: Table, event: Event) {
  //   table.filterGlobal(
  //     (event.target as HTMLInputElement).value,
  //     'contains'
  //   );
  // }
  onGlobalFilter( ) {

    }


  getAllCandidatesListForGlobalFilter(inputValue: any) {
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1)
      .subscribe((data) => {
        console.log(data);
        this.candidates = data.content || [];  // Provide a default empty array
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.currentPage = 0; // Reset to first page
        this.changeDetectorRefs.markForCheck();
      });
  }

  getAllCandidateList() {
    this.candidateService.getCandidatesWithPagination(this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content || [];  // Provide a default empty array
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  handleEditcandidate(candidate: Candidate) {
    const candidateId = candidate.id;

    console.log("Candidate object:", candidate);
    // Instead of using local storage, navigate to the 'editcandidate' route with the candidate object as a parameter in the state
    this.router.navigate(['editcandidate'], { state: { candidateId: candidateId, candidate: candidate } });
  }

  candidateDelete(candidate: Candidate) {
    console.log("candidate is is:" + candidate.id);
    // this.candidateService.deleteCandidate(candidate.id)
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.getAllCandidateList();
    //     },
    //     (err: HttpErrorResponse) => {
    //       if (err.error instanceof Error) {
    //         console.log('Client-side error occurred.');
    //       } else {
    //         console.log('Server-side error occurred.');
    //       }
    //     }
    //   );
  }


  openHiringFlow(candidate: Candidate) {
    localStorage.setItem('candidateid', JSON.stringify(candidate.id));
    this.router.navigate(['hiringflowactivity']);
  }
  toggleStages() {
    this.showStages = !this.showStages;
  }

  openNew(candidate: Candidate) {
    console.log("Candidate details for stage: " + candidate.email);
    this.selectededCandidate = candidate;
    this.temporaryStage = candidate.stage;
    this.submitted = false;
    this.productDialog = true;
}

hideDialog() {
    this.productDialog = false;
    this.submitted = false;
}


  toggleFilter() {
    this.displayFilterFields = !this.displayFilterFields;
    if (!this.displayFilterFields) {
     // this.dataTable.reset();
    }
  }
  onGlobalFilter1(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const inputValue = inputElement.value;
    console.log('Input Value:', inputValue);
    this.candidateService.searchCandidates(inputValue, 0, this.selectedRecordsOption1)
      .subscribe(
        data => {
          this.candidates = data.content || []; // Ensure this.candidates is an array
          this.totalElements = data.totalElements;
          this.totalPages = data.totalPages;
          this.currentPage = 0; // Reset to first page
          this.changeDetectorRefs.markForCheck();
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Client-side error occurred:', err.error.message);
          } else {
            console.log('Server-side error occurred:', err.status, err.message);
          }
        }
      );
  }



  updateCandidate(candidate: Candidate, stage: string) {
    //this.selectededCandidate.stage = this.temporaryStage;
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
        if (err.error instanceof Error) {
          console.log("Client-side error occurred:", err.error.message);
        } else {
          console.log("Server-side error occurred:", err.status, err.message);
        }
      }
    );
  }


  // getvendorDetailsById() {
  //   const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

  //   if (user.role?.name === 'vendor') {
  //     this.isVendor = true;
  //     this.candidateService.getVendorByUserId(user.id)
  //       .subscribe(
  //         (data) => {
  //           console.log("Vendor details:", data);
  //           this.vendor = data;
  //           this.getCandidatesByVendorId(this.vendor.id);
  //         },
  //         (err: HttpErrorResponse) => {
  //           console.error("Error fetching vendor details:", err.message);
  //         }
  //       );
  //   } else if (user.role?.name === 'admin') {
  //     this.isAdmin = true;
  //     this.getAllCandidateList();
  //   } else if (user.role?.name === 'recruiter') {
  //     console.log("User is a recruiter.");
  //     this.isRecruiter = true;
  //     this.getAllCandidateList();
  //   } else if (user.role?.name === 'candidate') {
  //     this.isCandidateLoggedIn = true;
  //     this.getCandidatesByCandidateId(user.id);
  //   } else {
  //     console.log("User role not recognized or no action specified.");
  //   }
  // }

// getVendorDetailsById(): void {
//   const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

//   if (user.role?.name === 'vendor') {
//     this.isVendor = true;
//     this.candidateService.getVendorByUserId(user.id)
//       .subscribe(
//         (data) => {
//           console.log("Vendor details:", data);
//           this.vendor = data;
//           this.getCandidatesByVendorId(this.vendor.id);
//         },
//         (err: HttpErrorResponse) => {
//           console.error("Error fetching vendor details:", err.message);
//         }
//       );
//   } else if (user.role?.name === 'admin') {
//     this.isAdmin = true;
//     this.getAllCandidateList();
//   } else if (user.role?.name === 'recruiter') {
//     console.log("User is a recruiter.");
//     this.isRecruiter = true;
//     this.getAllCandidateList();
//   } else if (user.role?.name === 'candidate') {
//     this.isCandidateLoggedIn = true;
//     this.getCandidatesByCandidateId(user.id);
//   } else {
//     console.log("User role not recognized or no action specified.");
//   }
// }
getVendorDetailsById() {
  const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');

  // if (user.role?.name === 'vendor') {
  //   this.isVendor = true;
  //   this.candidateService.getVendorByUserId(user.id)
  //     .subscribe(
  //       (data) => {
  //         console.log("Vendor details:", data);
  //         this.vendor = data;
  //         this.getCandidatesByVendorId(this.vendor.id);
  //       },
  //       (err: HttpErrorResponse) => {
  //         console.error("Error fetching vendor details:", err.message);
  //       }
  //     );
  // } else if (user.role?.name === 'admin') {
  //   this.isAdmin = true;
  //   this.getAllCandidateList();
  // } else if (user.role?.name === 'recruiter') {
  //   console.log("User is a recruiter.");
  //   this.isRecruiter = true;
  //   this.getAllCandidateList();
  // } else if (user.role?.name === 'candidate') {
  //   this.isCandidateLoggedIn = true;
  //   this.getCandidatesByCandidateId(user.id);
  // } else {
  //   console.log("User role not recognized or no action specified.");
  // }
}


  getCandidatesByVendorId(vendorId: any) {
    this.candidateService.getCandidatesByVendorId(vendorId, this.currentPage, this.selectedRecordsOption1)
      .subscribe((data) => {
        this.candidates = data.content || [];  // Provide a default empty array
        this.pagination = data;
        this.totalElements = data.totalElements;
        this.totalPages = data.totalPages;
        this.changeDetectorRefs.markForCheck();
      });
  }

  getCandidatesByCandidateId(candiadteId: any) {
    this.candidateService.getCandidateByUserId(candiadteId)
      .subscribe(
        (data) => {
          console.log("Vendor details:", data);
          this.candidate1 = data;
        },
        (err: HttpErrorResponse) => {
          console.error("Error fetching candidate details:", err.message);
        }
      );
  }

  goToFirstPage() {
    this.currentPage = 0;
    this.getVendorDetailsById();
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getVendorDetailsById();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getVendorDetailsById();
    }
  }

  goToLastPage() {
    this.currentPage = this.totalPages - 1;
    this.getVendorDetailsById();
  }

  onRecordsPerPageChange(event: Event) {
    this.selectedRecordsOption1 = +(event.target as HTMLSelectElement).value;
    this.currentPage = 0;
    this.getVendorDetailsById();
  }
}
