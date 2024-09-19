import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'app/shared/model/job';

@Component({
  selector: 'app-view-job',
  templateUrl: './view-job.component.html',
  styleUrls: ['./view-job.component.scss']
})
export class ViewJobComponent implements OnInit {

  //@Input() blog!: Blog;
  job: Job = new Job();

  constructor(
    private route: ActivatedRoute,
   // private messageService: MessageService,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    const stateData = history.state || {};
    this.job = stateData['job'];
  }

  //
  uploadedFiles: any[] = [];


  processResume(file: any) {
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:9000/resumes/upload', formData).subscribe(
      (response) => {
    //    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Resume uploaded successfully' });
      },
      (error) => {
       // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload resume' });
      }
    );
  }

  isFileAllowed(file: any): boolean {
    const allowedTypes = ['.pdf', '.doc', '.docx']; // Add more allowed types if needed
    const fileType = '.' + file.name.split('.').pop(); // Extract file extension
    return allowedTypes.includes(fileType.toLowerCase());
  }

  onBasicUpload() {
  //  this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }


  uploadedFile: any;


  onUpload(event: any) {
    const file = event.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file);

    this.http.post<any>('http://localhost:9000/resumes/upload', formData).subscribe(
      (response) => {
        this.uploadedFile = file;
      //  this.messageService.add({ severity: 'info', summary: 'Success', detail: 'Resume uploaded successfully' });
      },
      (error) => {
      //  this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to upload resume' });
      }
    );
  }

  //
  sortField: string = '';



}



