import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailtemplateService } from 'app/shared/hiring-process-services/emailtemplateervice.service';
import { CandidateEmail } from 'app/shared/model/candidateEmail';

@Component({
  selector: 'app-edit-email-template',
  templateUrl: './edit-email-template.component.html',
  styleUrls: ['./edit-email-template.component.scss']
})
export class EditEmailTemplateComponent implements OnInit {

  candidateEmail: CandidateEmail = new CandidateEmail();
  candidateEmails: CandidateEmail[] = [];

  // @ViewChild("jobForm")

  @ViewChild("jobForm", { static: false }) jobForm!: NgForm;

  emailForm!: NgForm;

  titles: any[] = [
    { "id": 1, "name": 'Sourced' },
    { "id": 2, "name": 'Screening' },
    { "id": 3, "name": 'Interview' },
    { "id": 4, "name": 'Preboarding' },
    { "id": 5, "name": 'Hired' },
    { "id": 6, "name": 'Archived' },
  ];

  constructor(
    private emailService: EmailtemplateService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    const stateData = history.state || {};
    const candidateEmail = stateData.candidateEmail;
    if (candidateEmail) {
      this.candidateEmail = candidateEmail;
    } else {
      console.error('candidateEmail data is missing in state.');
    }

    this.getAllEmailList();
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

  cancel(){
    this.router.navigate(['email-template/list']);
  }

  updateEmail() {
    this.emailService.updateEmail(this.candidateEmail).subscribe(
      res => {
        console.log(res);
        this.router.navigateByUrl('/email-template/list');
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
}

