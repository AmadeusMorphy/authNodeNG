import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  key: string = 'nizaR*123'
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {

    this.checkUserLoggedIn();
    this.userService.getData(this.key).subscribe(
      (res: any) => {
        console.log(res);
        
      }, err => {
        console.error(err);
        
      }
    )
  }

  checkUserLoggedIn() {
    this.userService.checkUserLoggedIn().subscribe(
      response => {
        console.log('Token is valid:', response);
      },
      error => {
        console.error('Token is invalid or expired:', error);
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
        
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.checkUserLoggedIn();
  }
}
