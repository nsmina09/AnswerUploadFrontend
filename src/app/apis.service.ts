import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApisService {

  private uploadUrl = 'http://localhost:3000/upload';
  private url = environment.apiUrl

  constructor(private http: HttpClient) { }

  uploadFile(file): Observable<any> {
    return this.http.post(this.uploadUrl, file);
  }

  signUp(data): Observable<any> {
    return this.http.post(this.url+'signup', data)
  }

  login(data): Observable<any> {
    return this.http.post(this.url+'login', data)
  }

  updateFiles(data): Observable<any> {
    return this.http.post(this.url+'updateFiles', data)
  }

  getAllFiles(id): Observable<any> {
    return this.http.get(this.url+`getFiles?id=${id}`)
  }
}
