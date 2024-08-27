import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecruiterService } from 'app/shared/hiring-process-services/recruiter.service';
import { Recruiter } from 'app/shared/model/recruiter';
import { Role } from 'app/shared/model/role';
import { UserAccout } from 'app/shared/model/userAccount';

@Component({
  selector: 'app-create-recruiter',
  templateUrl: './create-recruiter.component.html',
  styleUrls: ['./create-recruiter.component.scss']
})
export class CreateRecruiterComponent implements OnInit {

  recruiter: Recruiter = new Recruiter();
  recruiters: Recruiter[] | undefined;
 // @ViewChild("recruiterForm") recruiterForm!: NgForm;

  userAccount = new UserAccout();
  role = new Role();

  constructor(
    private recruiterService: RecruiterService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  getAllRecruiterList() {
    this.recruiterService.getRecruiterList().subscribe(
      (data) => {
        console.log(data);
        this.recruiters = data;
        this.changeDetectorRefs.markForCheck();
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

  addRecruiter() {
    // Uncomment and set user account and role details if necessary
    // let email = this.recruiter.email;
    // let mobile = this.recruiter.mobile;
    // this.userAccount.userName = email;
    // this.userAccount.password = mobile;
    // this.role.name = 'Admin';
    // this.role.description = 'This is for Admin';
    // this.userAccount.role = this.role;
    // this.recruiter.userAccout = this.userAccount;

    this.recruiterService.addRecruiter(this.recruiter).subscribe(
      res => {
        console.log(res);
        this.getAllRecruiterList();
      //  this.recruiterForm.reset();

        // Redirect to the "/recruiter" route after successfully adding a new recruiter
        this.router.navigateByUrl('recruiter/list');
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

  ngOnInit() {
    this.getAllRecruiterList();
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}


