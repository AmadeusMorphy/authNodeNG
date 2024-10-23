import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  signupForm: FormGroup;

  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = null;

    const {email, password} = this.loginForm.value
    this.userService.login(email, password).subscribe(
      
      response => {
  
        localStorage.setItem('token', response.token);

        this.router.navigate(['/home']);
      },
      err => {
        this.loading = false;
        this.error = err.error || 'Login failed';
      }
    )
  }

  onSignup() {
    if(this.signupForm.invalid) {
      return;
    }

    const {name, email, password} = this.signupForm.value;

    this.userService.signUp(name, email, password).subscribe(
      response => {
        console.log(response);
      }
    )
  }
}
