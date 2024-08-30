import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CandidateService } from 'app/shared/hiring-process-services/candidate.service';
import { Candidate } from 'app/shared/model/candidate';
import { Currency } from 'app/shared/model/currency';
import { Education } from 'app/shared/model/education';
import { Experience } from 'app/shared/model/experience';
import { Job } from 'app/shared/model/job';
import { Source } from 'app/shared/model/source';
import { TalentPool } from 'app/shared/model/talentpool';
import { UserAccout } from 'app/shared/model/userAccount';
import { Vendor } from 'app/shared/model/vendor';

@Component({
  selector: 'app-create-candidate',
  templateUrl: './create-candidate.component.html',
  styleUrls: ['./create-candidate.component.scss']
})
export class CreateCandidateComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}