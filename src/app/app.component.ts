import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CognitoService } from './cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  title = 'cognitoDemo';
  isAuthenticated: boolean;

  constructor(private router: Router,
              private cognitoService: CognitoService,
              private http: HttpClient) {
    this.isAuthenticated = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then((success: boolean) => {
      this.isAuthenticated = success;
    });
  }

  public signOut(): void {
    this.cognitoService.signOut()
    .then(() => {
      this.router.navigate(['/signIn']);
    });
  }

  public toApi():  void {
    console.log('send to Api')
     this.http.get('http://localhost:8080/hello').subscribe(
      response => {
        // Obsłuż odpowiedź z serwera
        console.log(response);
      },
      error => {
        // Obsłuż błąd
        console.error(error);
      }
    );;
  }

}