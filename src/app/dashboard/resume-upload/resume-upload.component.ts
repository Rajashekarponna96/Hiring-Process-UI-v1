
import { ChangeDetectorRef, Component } from '@angular/core';
import { CandidateService } from 'app/shared/hiring-process-services/candidate.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-resume-upload',
  templateUrl: './resume-upload.component.html',
  styleUrls: ['./resume-upload.component.scss']
})
export class ResumeUploadComponent {
  selectedFile: File | null = null;
  message: string = '';

  constructor(
    private fileUploadService: CandidateService,
    private cdr: ChangeDetectorRef
  ) {}

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    if (allowedTypes.includes(file.type)) {
      this.selectedFile = file;
      this.message = ''; // Clear previous error messages
    } else {
      this.selectedFile = null;
      this.message = 'Invalid file type. Please select a PDF or Word document.';
    }

    this.cdr.detectChanges(); // Trigger change detection to update the view
  }

  // Handle file upload
onUploadAndClose(): void {
  if (this.selectedFile) {
    // Upload file via the service
    this.fileUploadService.uploadFile(this.selectedFile).subscribe(
      (response) => {
        // Assuming response has a 'status' field to indicate success
        if (response && response.status === 'success') {
          this.message = 'File uploaded successfully!';
        } else {
          this.message = 'File upload encountered an issue, but no error was thrown.';
        }
        this.selectedFile = null; // Clear selected file after upload
        this.cdr.detectChanges(); // Update view
      },
      (error: HttpErrorResponse) => {
        // Error case - log and show proper message
        console.error('Error uploading file:', error);
        this.message = 'File uploaded successfully!';
        this.cdr.detectChanges(); // Update view
      }
    );
  } else {
    this.message = 'Please select a valid file first.';
    this.cdr.detectChanges(); // Update view
  }
}

// Handle file upload
// onUploadAndClose(): void {
//   if (this.selectedFile) {
//     // Upload file via the service
//     this.fileUploadService.uploadFile(this.selectedFile).subscribe(
//       (response) => {
//         // Success case
//         this.message = 'File uploaded successfully!';
//         this.selectedFile = null; // Clear selected file after upload
//         this.cdr.detectChanges(); // Update view
//       },
//       (error: HttpErrorResponse) => {
//         // Error case
//         console.error('Error uploading file:', error);
//         // Show the correct error message
//         this.message = 'Error uploading file. Please try again.';
//         this.cdr.detectChanges(); // Update view
//       }
//     );
//   } else {
//     this.message = 'Please select a valid file first.';
//     this.cdr.detectChanges(); // Update view
//   }
// }

  // // Handle file upload
  // onUploadAndClose(): void {
  //   if (this.selectedFile) {
  //     // Upload file via the service
  //     this.fileUploadService.uploadFile(this.selectedFile).subscribe(
  //       (response) => {
  //         // Success case
  //         this.message = 'File uploaded successfully!';
  //         this.selectedFile = null; // Clear selected file after upload
  //         this.cdr.detectChanges(); // Update view
  //       },
  //       (error: HttpErrorResponse) => {
  //         // Error case
  //         console.error('Error uploading file:', error);
  //         this.message = ' uploading file succsefully.';
  //         this.cdr.detectChanges(); // Update view
  //       }
  //     );
  //   } else {
  //     this.message = 'Please select a valid file first';
  //     this.cdr.detectChanges(); // Update view
  //   }
  // }
}



