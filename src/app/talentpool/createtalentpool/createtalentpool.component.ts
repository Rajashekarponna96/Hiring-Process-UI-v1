import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TalentpoolService } from 'app/shared/hiring-process-services/talentpool.service';
import { TalentPoolOne } from 'app/shared/model/talentpoolone';

@Component({
  selector: 'app-createtalentpool',
  templateUrl: './createtalentpool.component.html',
  styleUrls: ['./createtalentpool.component.scss']
})
export class CreatetalentpoolComponent implements OnInit {



  talentpool: TalentPoolOne = { id: 0, name: '', description: '', candidates: [] };
  talentpools: TalentPoolOne[] | undefined;

  // @ViewChild("talentpoolForm")
  @ViewChild("talentpoolForm", { static: false })
  talentpoolForm!: NgForm;

  constructor(
    private talentpoolService: TalentpoolService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit() {
    this.getAllTalentPoolList();
  }

  onGlobalFilter( ) {

  }

  getAllTalentPoolList() {
    this.talentpoolService.getTalentPoolList().subscribe((data) => {
      console.log(data);
      this.talentpools = data;
      this.changeDetectorRefs.markForCheck();
    });
  }

  addTalentPool() {
    this.talentpoolService.addTalentPool(this.talentpool).subscribe(
      res => {
        console.log(res);
        this.getAllTalentPoolList();
        this.talentpoolForm.reset();
        // Navigate to a specific route after saving
        this.router.navigate(['/talentpool/Listtalentpool']);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client-side error occurred.");
        } else {
          console.log("Server-side error occurred.");
        }
      }
    );
    console.log(JSON.stringify(this.talentpool));
  }

  onSubmit() {
    // Implement onSubmit logic if needed
  }
}
