import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'app/shared/hiring-process-services/job.service';
import { Client } from 'app/shared/model/client';
import { Currency } from 'app/shared/model/currency';
import { Department } from 'app/shared/model/Department';
import { Job } from 'app/shared/model/job';
import { locations1 } from 'app/shared/model/locations1';
import { Recruiter } from 'app/shared/model/recruiter';

@Component({
  selector: 'app-edit-jobs',
  templateUrl: './edit-jobs.component.html',
  styleUrls: ['./edit-jobs.component.scss']
})
export class EditJobsComponent implements OnInit {

  @ViewChild("jobForm", { static: false }) jobForm!: NgForm;
  // @ViewChild("jobForm") jobForm!: NgForm;

  job: Job = new Job();
  jobs: Job[] = [];
  client = new Client();
  clients: Client[] = [];
  department = new Department();
  departments: Department[] = [];
  currency = new Currency();
  currencys: Currency[] = [];
  recruiter = new Recruiter();
  recruiters: Recruiter[] = [];
  locations1: locations1[] = [];


  selectedJobType: any;

  types: any[] = [
    { "name": 'FullTime' },
    { "name": 'PartTime' },
    { "name": 'CONTRACT' },
    { "name": 'FreeLance' }
  ];

  constructor(
    private jobService: JobService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    const stateData = history.state || {};
    const job = stateData.job;

    if (job) {
      this.job = job;
    } else {
      console.error('Job data is missing in state.');
    }

    this.getAllJobList();
    this.getAllDepartmentList();
    this.getAllCurrencyList();
    this.getAllRecruiterList();
    this.getAllClientList();
    this.getAllLocationList();
  }

  getAllJobList() {
    this.jobService.getAllJobs().subscribe((data: Job[]) => {
      this.jobs = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllDepartmentList() {
    this.jobService.getAllDepartments().subscribe((data: Department[]) => {
      this.departments = data;
      this.changeDetectorRefs.markForCheck();
      if (this.job.department) {
        this.job.department = this.departments.find(dep => dep.id === this.job.department.id);
      }
    });
  }

  getAllCurrencyList() {
    this.jobService.getAllCurrencies().subscribe((data: Currency[]) => {
      this.currencys = data;
      this.changeDetectorRefs.markForCheck();
      if (this.job.currney) {
        this.job.currney = this.currencys.find(currency => currency.id === this.job.currney.id) || null;
      }
    });
  }

  getAllRecruiterList() {
    this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
      this.recruiters = data;
      this.changeDetectorRefs.markForCheck();
  
      // Ensure that the recruiter object is selected properly
      if (this.job.recruiters) {
        this.job.recruiters = this.recruiters.find(recruiter => recruiter.id === this.job.recruiters.id) || null;
      }
    });
  }
  

  getAllClientList() {
    this.jobService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.changeDetectorRefs.markForCheck();
      if (this.job.clients) {
        this.job.clients = this.clients.find(client => client.id === this.job.clients.id);
      }
    });
  }

  cancel(){
    this.router.navigate(['/jobs/list']);
  }

  updateJob() { debugger
   //  this.job.department = this.departments;
  //   this.job.recruiters = this.recruiter;
  //   this.job.currney = this.currency;
  //  // this.job.type = this.types;
  //   this.job.clients = this.client;

    this.jobService.updateJob(this.job).subscribe(
      res => {
        this.getAllJobList();
        this.jobForm.reset();
        this.router.navigateByUrl('/jobs/list');
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      }
    );
  }

  // onDepartmentChange(data: any) {
  //   console.log("selected department:", data);
  //   console.log("departments: " + JSON.stringify(this.selectedDepartments));
  // }

  // onRecruiterChange(data: any) {
  //   console.log("selected recruiter:", data);
  //   console.log("Recruiters: " + JSON.stringify(this.selectedRecruiters));
  // }

  // onCurrencyChange(data: any) {
  //   console.log("selected currency:", data);
  //   console.log("Currencies: " + JSON.stringify(this.selectedCurrencys));
  // }

  // onClientChange(data: any) {
  //   console.log("selected client:", data);
  //   console.log("clients: " + JSON.stringify(this.selectedClients));
  // }

  todayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

    getAllLocationList() {
          this.jobService.getAllLocations().subscribe((data: Location[]) => {
          //  this.locations1 = data;
            this.changeDetectorRefs.markForCheck();
          });
        }
  }

