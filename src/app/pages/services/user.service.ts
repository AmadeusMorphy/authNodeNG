import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = 'http://localhost:3000/api/v1';

  constructor(
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    
  }

  getData() {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    return this.http.get(`${environment.apiUrl}/students`, { headers })
  }
}
