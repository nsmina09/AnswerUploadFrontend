import { Component, OnInit } from '@angular/core';
import { ApisService } from '../apis.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  public images: any[] = [0, 1, 2, 3, 4, 5];
  public user: any = JSON.parse(localStorage.getItem('user') || '{}');
  public files = []

  constructor(
    private api: ApisService,
  ) {
  }

  ngOnInit(): void {
    this.getAllFile()
  }

  onFileChange(event: any, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.uploadFile(file, index);
    }
  }

  uploadFile(file: File, index: number): void {
    console.log(file, index);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('index', index.toString());

    this.api.uploadFile(formData).subscribe(
      (response) => {
        console.log('Upload successful', response);
        this.images[index] = response.fileUrl;
        this.updateFileInDb(response.fileUrl)
      },
      (error) => {
        console.error('Upload error', error);
      }
    );
  }

  updateFileInDb(url) {
    let data = {
      fileUrl: url,
      id: this.user?.unqId
    }
    this.api.updateFiles(data).subscribe({
      next: (value) => {
        alert('File uploaded successfully')
      }, error: (err) => {
        if (err.status === 400) {
          alert('id and url are required');
        } else if (err.status === 404) {
          alert('user not exist');
        } else if (err.status === 500) {
          alert('Internal Server Error: Please try again later');
        } else {
          alert('An unexpected error occurred');
        }
      },
    })
  }

  getAllFile() {
    const id = this.user?.unqId;
    console.log(this.user, id);
    this.api.getAllFiles(id).subscribe({
      next: (response) => {
        if (response.status == 200 || response.status == 201) {
          this.files = response.files
        } else {
          this.files = []
        }
      },
      error: (err) => {
        this.files = []
      }
    });
  }

  isImage(fileUrl: string): boolean {
    return fileUrl.endsWith('.jfif') || fileUrl.endsWith('.jpg') || fileUrl.endsWith('.jpeg') || fileUrl.endsWith('.png') || fileUrl.endsWith('.gif');
  }

  isPdf(fileUrl: string): boolean {
    return fileUrl.endsWith('.pdf');
  }

  preview(url) {
    window.open(url, '_blank');
  }


}
