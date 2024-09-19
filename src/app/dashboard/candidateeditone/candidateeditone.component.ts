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
import { Location } from 'app/shared/model/location';

@Component({
  selector: 'app-candidateeditone',
  templateUrl: './candidateeditone.component.html',
  styleUrls: ['./candidateeditone.component.scss']
})
export class CandidateeditoneComponent implements OnInit {
  showExperience: boolean = false;
  showEducationFields: boolean = false;
  editMode: boolean = false;
  skills: string[] = [];
  newSkill: string = '';
  selectedIndex: number | undefined;
  educationDetails: Education[] = [];
  experienceDetails: Experience[] = [];
  candidate: Candidate = new Candidate();
  education: Education = new Education();
  experience: Experience = new Experience();
  showSuccessMessage: boolean = false;
  candidates: Candidate[] = [];
  sources: Source[] = [];
  locations: any[] = [];
  talentpools: TalentPool[] = [];
  jobs: Job[] = [];
  currencies: Currency[] = [];
  currentStep: number = 0;
  totalSteps: number = 3; // Example total steps

  //itemss!: MenuItem[];

  constructor(
    private candidateService: CandidateService,
    private changeDetectorRefs: ChangeDetectorRef,
    private router: Router
  ) { }
  // itemss: any[] = [
  //       { label: 'Profile' },
  //       { label: 'Education' },
  //       { label: 'Experience' },
  //       { label: 'Confirm Details' }
  //     ];

  ngOnInit() {
    const stateData = history.state || {};
    const candidate = stateData.candidate;

    if (candidate) {
      this.candidate = candidate;
      this.educationDetails = this.candidate.educations;
      this.experienceDetails = this.candidate.experiences;
      this.skills = this.candidate.skills;
    } else {
      console.error('Candidate data is missing in state.');
    }

    this.loadInitialData();
  }

  loadInitialData() {
    this.getAllCandidateList();
    this.getAllSourcesList();
    this.getAllLocationList();
    this.getAllCurrencyList();
    this.getAllJobsList();
    this.getAllTalentPoolList();
  }

  maxDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  prevStep() {
    this.currentStep--;
  }

  nextStep() {
    this.currentStep++;
  }

  updateEndDateMinDate() {
    if (this.education.startOfCourse) {
      const startDate = new Date(this.education.startOfCourse);
      const endDate = new Date(this.education.endOfCourse);
      if (endDate < startDate) {
        this.education.endOfCourse = this.education.startOfCourse;
      }
    }
  }

  validateEducation(): boolean {
    if (!this.education.course || !this.education.branch || !this.education.startOfCourse ||
      !this.education.endOfCourse || !this.education.college || !this.education.university || !this.education.location) {
      throw new Error('All fields are required.');
    }
    return true;
  }

  submitEducation() {
    if (this.validateEducation()) {
      if (this.editMode && this.selectedIndex !== undefined) {
        this.educationDetails[this.selectedIndex] = { ...this.education };
        this.editMode = false;
        this.selectedIndex = undefined;
      } else {
        const existingIndex = this.educationDetails.findIndex((edu) => edu.course === this.education.course && edu.branch === this.education.branch);
        if (existingIndex !== -1) {
          this.educationDetails[existingIndex] = { ...this.education };
        } else {
          this.educationDetails.push({ ...this.education });
        }
      }
      this.clearEducationFields();
    }
  }

  clearEducationFields() {
    this.education = new Education();
    this.showEducationFields = false;
  }

  editEducation(index: number) {
    this.education = { ...this.educationDetails[index] };
    this.editMode = true;
    this.selectedIndex = index;
  }

  deleteEducation(index: number) {
    this.educationDetails.splice(index, 1);
  }

  updateEndDateMinDate1() {
    if (this.experience.dateOfJoining) {
      const startDate = new Date(this.experience.dateOfJoining);
      if (this.experience.dateOfRelieving) {
        const endDate = new Date(this.experience.dateOfRelieving);
        if (endDate < startDate) {
          this.experience.dateOfRelieving = this.experience.dateOfJoining;
        }
      }
    }
  }

  clearExperienceFields() {
    this.experience = new Experience();
    this.showExperience = false;
  }

  validateExperience(): boolean {
    if (!this.experience.company || !this.experience.jobTitle || !this.experience.dateOfJoining || !this.experience.dateOfRelieving || !this.experience.location) {
      return false;
    }
    return true;
  }

  submitExperience() {
    if (this.validateExperience()) {
      if (this.editMode && this.selectedIndex !== undefined) {
        this.experienceDetails[this.selectedIndex] = { ...this.experience };
        this.editMode = false;
        this.selectedIndex = undefined;
      } else {
        const existingIndex = this.experienceDetails.findIndex((exp) => exp.company === this.experience.company && exp.jobTitle === this.experience.jobTitle);
        if (existingIndex !== -1) {
          this.experienceDetails[existingIndex] = { ...this.experience };
        } else {
          this.experienceDetails.push({ ...this.experience });
        }
      }
      this.clearExperienceFields();
    }
  }

  editExperience(index: number) {
    this.experience = { ...this.experienceDetails[index] };
    this.editMode = true;
    this.selectedIndex = index;
  }

  deleteExperience(index: number) {
    this.experienceDetails.splice(index, 1);
  }

  addSkills(event?: any) {
    if (event) {
      const value = event.value;
      if (value && !this.skills.includes(value)) {
        this.skills.push(value);
      }
    } else if (this.newSkill && !this.skills.includes(this.newSkill)) {
      this.skills.push(this.newSkill);
      this.newSkill = '';
    }
  }

  removeSkills(skill: string) {
    const index = this.skills.indexOf(skill);
    if (index !== -1) {
      this.skills.splice(index, 1);
    }
  }

  updateCandidate() {
    this.candidate.experiences = this.experienceDetails;
    this.candidate.educations = this.educationDetails;
    this.candidate.skills = this.skills;
    const user: UserAccout = JSON.parse(localStorage.getItem('userDetails') || '{}');
    this.candidate.modifiedBy = user;

    this.candidateService.updateCandidate(this.candidate).subscribe(
      res => {
        // this.candidate.reset();
        this.educationDetails = [];
        this.experienceDetails = [];
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 5000);
        this.router.navigate(['/candidate/list']);
      },
      (err: HttpErrorResponse) => {
        console.error("Error occurred:", err.message);
      }
    );
  }

  getAllCandidateList() {
    this.candidateService.getAllCandidates().subscribe(
      data => {
        this.candidates = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }

  getAllSourcesList() {
    this.candidateService.getAllSources().subscribe(
      data => {
        this.sources = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }

  getAllLocationList() {
    this.candidateService.getAllLocations().subscribe(
      data => {
        this.locations = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }

  getAllTalentPoolList() {
    this.candidateService.getAllTalentPools().subscribe(
      data => {
        this.talentpools = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }

  getAllJobsList() {
    this.candidateService.getAllJobs().subscribe(
      data => {
        this.jobs = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }

  getAllCurrencyList() {
    this.candidateService.getAllCurrencies().subscribe(
      data => {
        this.currencies = data;
        this.changeDetectorRefs.markForCheck();
      },
      err => console.error(err)
    );
  }


  EditEducation(index: number) {
    const selectedEducation = this.educationDetails[index];

    // Set the fields to be edited
    this.education = { ...selectedEducation };

    // Set edit mode and selected index
    this.editMode = true;
    this.selectedIndex = index;
  }


  submitExceperience() {
    // Validate the experience details before adding or updating in the table
    if (this.validateExperience()) {
      if (this.editMode && this.selectedIndex !== undefined && this.selectedIndex !== null) {
        // Update the existing experience details
        this.experienceDetails[this.selectedIndex] = { ...this.experience };

        // Reset edit mode and selected index
        this.editMode = false;
        //   this.selectedIndex = null;
      } else {
        // Check if the experience already exists
        const existingIndex = this.experienceDetails.findIndex(exp => exp.company === this.experience.company && exp.jobTitle === this.experience.jobTitle);

        if (existingIndex !== -1) {
          // Update the existing experience details
          this.experienceDetails[existingIndex] = { ...this.experience };
        } else {
          // Add new experience details to the table
          this.experienceDetails.push({ ...this.experience });
        }
      }

      // Clear the form fields after submission
      this.clearExperienceFields();
    }
  }


  addSkill() {
    if (this.newSkill) {
      this.skills.push(this.newSkill);
      this.newSkill = ''; // Clear the input after adding
    }
  }
  
  // Remove skill from the list
  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }
  
  // For handling form submission (optional)
  onSubmit() {
    if (this.skills.length > 0) {
      console.log('Skills submitted:', this.skills);
    } else {
      console.log('No skills added.');
    }
  }

}

