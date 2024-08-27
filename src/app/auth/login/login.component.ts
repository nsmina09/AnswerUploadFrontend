import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/apis.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: ApisService) {

    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      return;
    } else {
      this.service.login(this.loginForm.value).subscribe({
        next: (e) => {
          if (e.status === 200 || e.status === 201) {
            localStorage.setItem('user', JSON.stringify(e.user));
            this.router.navigateByUrl('dashboad/file');
          } else {
            alert('User not registered');
          }
        },
        error: (err) => {
          if (err.status === 400) {
            alert('Invalid password');
          } else if (err.status === 404) {
            alert('User not exist');
          } else if (err.status === 500) {
            alert('Internal Server Error: Please try again later');
          } else {
            alert('An unexpected error occurred');
          }
        }
      });
    }
  }

  signUp() {
    this.router.navigateByUrl('auth/signup')
  }

}
