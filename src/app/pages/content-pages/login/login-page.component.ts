import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UseraccountService } from 'app/shared/hiring-process-services/useraccount.service';
import { UserAccout } from 'app/shared/hiring-process-services-model/userAccount';
//import { MessageService } from 'primeng/api'; // Assuming you're using PrimeNG for notifications

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  @ViewChild('loginForm', { static: false }) loginForm: NgForm;

  userAccount = new UserAccout();
  rememberMe: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userAccountService: UseraccountService,
  //  private messageService: MessageService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  // On submit button click
  onSubmit() {
    this.loginForm.reset();
  }

  // On Forgot password link click
  onForgotPassword() {
    this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
  }

  // On registration link click
  onRegister() {
    this.router.navigate(['register'], { relativeTo: this.route.parent });
  }

  addLogin() {
    this.userAccountService.login(this.userAccount).subscribe(
      (res) => {
        console.log(res);
        this.userAccount = res;
        localStorage.setItem('userDetails', JSON.stringify(this.userAccount));
     //   this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User logged in successfully', life: 3000 });
        this.router.navigate(['/dashboard/dashboard1']); // Redirect to the dashboard
      },
      (err: HttpErrorResponse) => {
        console.error('Error occurred:', err);
      //  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000 });
        // Optionally handle error redirection here
        this.router.navigate(['/pages/login']);
      }
    );
  }
}


// import { HttpErrorResponse } from '@angular/common/http';
// import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
// import { NgForm } from '@angular/forms';
// import { Router, ActivatedRoute } from "@angular/router";
// import { UseraccountService } from 'app/shared/hiring-process-services/useraccount.service';
// import { UserAccout } from 'app/shared/model/userAccount';

// @Component({
//     selector: 'app-login-page',
//     templateUrl: './login-page.component.html',
//     styleUrls: ['./login-page.component.scss'],

// })

// export class LoginPageComponent implements OnInit {

//     @ViewChild('f', { static: false }) loginForm: NgForm;


//     userAccount = new UserAccout();
//     userAccounts: UserAccout[] | undefined;
//     userName: any;
//     password: any;
//     rememberMe: boolean = false;
//     messageService: any;


//     constructor(private router: Router,
//         private route: ActivatedRoute, private userAccountService: UseraccountService,
//         private changeDetectorRefs: ChangeDetectorRef
//     ) { }
//     ngOnInit(): void {
//         throw new Error('Method not implemented.');
//     }

//     // On submit button click
//     onSubmit() {
//         this.loginForm.reset();
//     }
//     // On Forgot password link click
//     onForgotPassword() {
//         this.router.navigate(['forgotpassword'], { relativeTo: this.route.parent });
//     }
//     // On registration link click
//     onRegister() {
//         this.router.navigate(['register'], { relativeTo: this.route.parent });
//     }


//     addLogin() {
//         this.userAccountService.login(this.userAccount).subscribe(
//             res => {
//                 console.log(res);
//                 this.userAccount = res;
//                 localStorage.setItem('userDetails', JSON.stringify(this.userAccount));
//                 this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'User logged in successfully', life: 3000 });
//                 this.router.navigate(['/dashboard/dashboard1']);
//             },
//             (err: HttpErrorResponse) => {
//                 console.error('Error occurred:', err);
//                 this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Login failed', life: 3000 });
//                 this.router.navigate(['/dashboard/dashboard1']);
//             }
//         );
//     }
// }
