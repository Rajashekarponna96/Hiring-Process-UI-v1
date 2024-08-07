import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
import { Task } from './taskboard-ngrx.model';

import { Store } from '@ngrx/store';
import { Observable ,  Subscription } from 'rxjs';

import * as TaskboadActions from './store/taskboard.actions';
import * as fromTaskboard from './store/taskboard.reducers';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TalentpoolService } from 'app/shared/hiring-process-services/talentpool.service';
import { TalentPoolOne } from 'app/shared/model/talentpoolone';

@Component({
  selector: 'app-ngrx-taskboard',
  templateUrl: './taskboard-ngrx.component.html',
  styleUrls: ['./taskboard-ngrx.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TaskboardNGRXComponent implements OnInit {

  @ViewChild('todoTitle', {static: false}) titleInputRef: ElementRef;
  @ViewChild('todoMessage', {static: false}) messageInputRef: ElementRef;
  subscription: Subscription;
  taskboardState: Observable<fromTaskboard.State>;



  // constructor(private elRef: ElementRef, private store: Store<fromTaskboard.FeatureState>) {

  // }

  // ngOnInit() {
  // }

  // onAddTask() {
  //   if (this.messageInputRef.nativeElement.value != "" && this.titleInputRef.nativeElement.value != "") {
  //     this.store.dispatch(new TaskboadActions.AddTodo(new Task(
  //       this.titleInputRef.nativeElement.value,
  //       this.messageInputRef.nativeElement.value,
  //       'Nov 12',
  //       'Elizabeth Elliott',
  //       'assets/img/portrait/small/avatar-s-3.png',
  //       'New'
  //     )));
  //   }
  //   this.titleInputRef.nativeElement.value = "";
  //   this.messageInputRef.nativeElement.value = "";
  //   this.titleInputRef.nativeElement.focus();
  // }


  talentpool: TalentPoolOne = { id: 0, name: '', description: '', candidates: [] };
  talentpools: TalentPoolOne[] | undefined;

  // @ViewChild("talentpoolForm")
  // talentpoolForm!: NgForm;
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

  onGlobalFilter(  ) {

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
        this.router.navigate(['/listtalentpool']);
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
