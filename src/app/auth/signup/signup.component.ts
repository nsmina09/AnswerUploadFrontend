import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisService } from 'src/app/apis.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public signUpForm: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private service: ApisService) {

    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required],
      role: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  login() {
    this.router.navigateByUrl('auth/login')
  }

  signUp() {
    console.log(this.signUpForm.value);
    if (this.signUpForm.invalid) {
      return;
    } else {
      this.service.signUp(this.signUpForm.value).subscribe({
        next: (e) => {
          if (e.status === 200|| e.status===201) {
            localStorage.setItem('user', JSON.stringify(e.user));
            this.router.navigateByUrl('dashboad/file');
          } else {
            alert('User email or mobile already registered');
          }
        },
        error: (err) => {
          if (err.status === 400) {
            alert('User email or mobile already registered');
          } else if (err.status === 500) {
            alert('Internal Server Error: Please try again later');
          } else {
            alert('An unexpected error occurred');
          }
        }
      });
    }
  }

  

}
