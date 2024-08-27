import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecruiterService } from 'app/shared/hiring-process-services/recruiter.service';
import { Recruiter } from 'app/shared/model/recruiter';

@Component({
  selector: 'app-edit-recruiter',
  templateUrl: './edit-recruiter.component.html',
  styleUrls: ['./edit-recruiter.component.scss']
})
export class EditRecruiterComponent implements OnInit {

 // @ViewChild("recruiterForm") recruiterForm!: NgForm;

  recruiter = new Recruiter();
  recruiters: Recruiter[] = [];

  constructor(
    private router: Router,
    private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private recruiterService: RecruiterService
  ) { }

  ngOnInit() {
    const stateData = history.state || {};
    const recruiter = stateData.recruiter;

    if (recruiter) {
      this.recruiter = recruiter;
    } else {
      console.error('Recruiter data is missing in state.');
    }
  }

  getRecruiter(recruiterId: number) {
    this.recruiterService.getRecruiterById(recruiterId).subscribe(
      (recruiter: Recruiter) => {
        this.recruiter = recruiter;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching recruiter details:', error.message);
      }
    );
  }

  updateRecruiter() {
    this.recruiterService.updateRecruiter(this.recruiter).subscribe(
      res => {
        console.log('Recruiter updated successfully:', res);
        this.getAllRecruiters();
    //    this.recruiterForm.reset();

        this.router.navigateByUrl('/recruiter/list');
      },
      (err: HttpErrorResponse) => {
        console.error('Error updating recruiter:', err.message);
      }
    );
  }

  getAllRecruiters() {
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
}
