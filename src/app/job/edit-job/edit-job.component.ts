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
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.scss']
})
export class EditJobComponent implements OnInit {


  //
  @ViewChild("jobForm", { static: false }) jobForm!: NgForm;
  // @ViewChild("jobForm") jobForm!: NgForm;

  job: Job = new Job();
  jobs: Job[] = [];
  client = new Client();
  selectedClients: any;
  clients: Client[] = [];
  department = new Department();
  selectedDepartments: any;
  departments: Department[] = [];
  currency = new Currency();
  selectedCurrencys: any;
  currencys: Currency[] = [];
  recruiter = new Recruiter();
  selectedRecruiters: any;
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
      this.selectedDepartments = this.job.department;
      this.selectedCurrencys = this.job.currney;
      this.selectedRecruiters = this.job.recruiters;
      this.selectedJobType = this.job.type;
      this.selectedClients = this.job.clients;
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
    });
  }

  getAllCurrencyList() {
    this.jobService.getAllCurrencies().subscribe((data: Currency[]) => {
      this.currencys = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllRecruiterList() {
    this.jobService.getAllRecruiters().subscribe((data: Recruiter[]) => {
      this.recruiters = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  getAllClientList() {
    this.jobService.getAllClients().subscribe((data: Client[]) => {
      this.clients = data;
      this.changeDetectorRefs.markForCheck();
    });
  }



  updateJob() {
    this.job.department = this.selectedDepartments;
    this.job.recruiters = this.selectedRecruiters;
    this.job.currney = this.selectedCurrencys;
    this.job.type = this.selectedJobType;
    this.job.clients = this.selectedClients;

    this.jobService.updateJob(this.job).subscribe(
      res => {
        this.getAllJobList();
        this.jobForm.reset();
        this.router.navigateByUrl('/jobs');
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

  onDepartmentChange(data: any) {
    console.log("selected department:", data);
    console.log("departments: " + JSON.stringify(this.selectedDepartments));
  }

  onRecruiterChange(data: any) {
    console.log("selected recruiter:", data);
    console.log("Recruiters: " + JSON.stringify(this.selectedRecruiters));
  }

  onCurrencyChange(data: any) {
    console.log("selected currency:", data);
    console.log("Currencies: " + JSON.stringify(this.selectedCurrencys));
  }

  onClientChange(data: any) {
    console.log("selected client:", data);
    console.log("clients: " + JSON.stringify(this.selectedClients));
  }

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
