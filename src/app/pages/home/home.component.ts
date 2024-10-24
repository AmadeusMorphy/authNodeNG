import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  key: string = 'nizaR*123'

  keyForm: FormGroup;

  usersData: any;
  displayData = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.keyForm = this.fb.group({
      key: ['', Validators.required]
    })
  }

  ngOnInit() {

    this.checkUserLoggedIn();

  }

  checkUserLoggedIn() {
    this.userService.checkUserLoggedIn().subscribe(
      response => {
        console.log('Token is valid:', response);
      },
      error => {

        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.checkUserLoggedIn();
  }

  checkKey() {
    if(this.keyForm.valid){
      let keyValue = this.keyForm.value.key;

      if(keyValue === "nizaR*123"){
      console.log('CORRECT KEY' ,this.keyForm.value.key);
      this.userService.getData(this.key).subscribe(
        (res: any) => {
          this.usersData = res.map((user: any) => user )
          this.displayData = true;
        }, err => {
          console.error(err);
          
        }
      )
      }else{
        console.log('wrong value bitch');
      }
      
    }
  }
}
