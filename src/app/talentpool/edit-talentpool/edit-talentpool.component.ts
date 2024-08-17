import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TalentpoolService } from 'app/shared/hiring-process-services/talentpool.service';
import { TalentPoolOne } from 'app/shared/model/talentpoolone';

@Component({
  selector: 'app-edit-talentpool',
  templateUrl: './edit-talentpool.component.html',
  styleUrls: ['./edit-talentpool.component.scss']
})
export class EditTalentpoolComponent implements OnInit {


  @ViewChild("talentpoolForm", { static: false })


// @ViewChild("talentPoolForm")
talentPoolForm!: NgForm;

talentPool = new TalentPoolOne();

constructor(
  private talentPoolService: TalentpoolService,
  private router: Router,
  private route: ActivatedRoute
) { }

ngOnInit() {
  debugger;
  const state = history.state;
  if (state && state.talentPool) {
    this.talentPool = state.talentPool;
  } else {
    // Handle if talent pool object is not passed
    const talentPoolId = this.route.snapshot.paramMap.get('id');
    if (talentPoolId) {
      this.getTalentPoolById(Number(talentPoolId));
    }
  }
}

getTalentPoolById(id: number) {
  this.talentPoolService.getTalentPoolById(id).subscribe(
    (data: TalentPoolOne) => {
      this.talentPool = data;
    },
    (error: HttpErrorResponse) => {
      console.error("Error fetching talent pool:", error);
    }
  );
}

// updateTalentPool() {
//   this.talentPoolService.updateTalentPool(this.talentPool).subscribe(
//     res => {
//       console.log("Updated talent pool:", res);
//       // Handle success
//       this.talentPoolForm.reset();
//       // Redirect to another route
//      // this.router.navigate(['dashboard/dashboard2'], { state: { talentPool: talentPool } });
//       this.router.navigateByUrl('tables/extended');
//     },
//     (err: HttpErrorResponse) => {
//       // Handle errors
//       if (err.error instanceof Error) {
//         console.log("Client-side error occurred:", err.error.message);
//       } else {
//         console.log("Server-side error occurred:", err.status, err.message);
//       }
//     }
//   );
// }

updateTalentPool() {
  this.talentPoolService.updateTalentPool(this.talentPool).subscribe(
    res => {
      console.log('Updated talent pool:', res);
      // Handle success
      this.talentPoolForm.resetForm(); // Use resetForm() method
      // Redirect to another route
      this.router.navigateByUrl('/talentpool/Listtalentpool');
    },
    (err: HttpErrorResponse) => {
      // Handle errors
      if (err.error instanceof Error) {
        console.log('Client-side error occurred:', err.error.message);
      } else {
        console.log('Server-side error occurred:', err.status, err.message);
      }
    }
  );
}
}