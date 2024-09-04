import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'app/shared/hiring-process-services/home.service';
import { Job } from 'app/shared/model/job';

@Component({
  selector: 'app-dashboard1',
  templateUrl: './dashboard1.component.html',
  styleUrls: ['./dashboard1.component.scss']
})
export class Dashboard1Component implements OnInit, OnDestroy {

  jobs: Job[] = []; // Array to store jobs
  clientNames: { [clientId: string]: string } = {}; // Object to store client names by ID

  sortField: string = '';
  sortOptions: Array<{ label: string, value: string }> = [
    { label: 'Recent Posts', value: 'share' },
    { label: 'Old Posts', value: 'comment' }
  ];
  sortOrder: number = 0;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllJobsWithClients();
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }

  getAllJobsWithClients(): void {
    this.homeService.getAllJobsWithClients().subscribe(
      (response) => {
        if (Array.isArray(response)) {
          this.jobs = response;
        } else {
          console.error('Invalid API response: Expected an array but received:', response);
        }
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  handleViewJob(job: Job): void {
    console.log('Job object to view:', job); // Log the job object
    // Navigate to the 'jobview' route with the job object as a parameter in the state
    this.router.navigate(['jobview'], { state: { job: job } });
  }

  onSortChange(event: any): void {
    const value = event.target.value;

    if (value.startsWith('!')) {
      this.sortOrder = -1;
      this.sortField = value.substring(1);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  onFilter(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.jobs = this.jobs.filter(job => job.title.toLowerCase().includes(searchValue));
  }
}


// import { Component, OnDestroy, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { HomeService } from 'app/shared/hiring-process-services/home.service';
// import { Job } from 'app/shared/model/job';


// @Component({
//     selector: 'app-dashboard1',
//     templateUrl: './dashboard1.component.html',
//     styleUrls: ['./dashboard1.component.scss']
// })

// export class Dashboard1Component implements OnInit {

//     jobs: Job[] = []; // Use Job[] to match the type returned by the service
//     clientNames: { [clientId: string]: string } = {}; // Object to store client names by ID

//     sortField: string = '';
//     sortOptions: SelectItem[] = [
//       { label: 'Recent Posts', value: 'share' },
//       { label: 'Old Posts', value: 'comment' }
//     ];
//     sortOrder: number = 0;

//     constructor(private homeService: HomeService, private router: Router) { }

//     ngOnInit(): void {
//       this.getAllJobsWithClients();
//     }

//     ngOnDestroy(): void {
//       // Cleanup logic if needed
//     }

//     getAllJobsWithClients(): void {
//       this.homeService.getAllJobsWithClients().subscribe(
//         (response) => {
//           if (Array.isArray(response)) {
//             this.jobs = response;
//           } else {
//             console.error('Invalid API response: Expected an array but received:', response);
//           }
//         },
//         (error) => {
//           console.error('Error fetching jobs:', error);
//         }
//       );
//     }

//     handleViewJob(job: Job) {
//       console.log('Job object to view:', job); // Log the job object
//       // Navigate to the 'viewjob' route with the job object as a parameter in the state
//       this.router.navigate(['jobview'], { state: { job: job } });
//     }

//     onSortChange(event: any) {
//       const value = event.value;

//       if (value.indexOf('!') === 0) {
//         this.sortOrder = -1;
//         this.sortField = value.substring(1, value.length);
//       } else {
//         this.sortOrder = 1;
//         this.sortField = value;
//       }
//     }

//     onFilter(dv: DataView, event: Event) {
//       dv.filter((event.target as HTMLInputElement).value);
//     }
//   }

