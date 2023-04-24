import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Auth } from 'aws-amplify';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Tutaj możesz pobrać token JWT i przypisać go do zmiennej
    const token = 'TWÓJ_TOKEN_JWT'; // Zastąp tym kodem, który pobierze Twój token JWT

    // Dodaj token JWT do nagłówka Authorization żądania HTTP
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return from(Auth.currentSession())
            .pipe(
                switchMap((auth: any) => { // switchMap() is used instead of map().

                    let jwt = auth.accessToken.jwtToken;
                    let with_auth_request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${jwt}`
                        }
                    });
                    console.log("Cloned",with_auth_request);
                    return next.handle(with_auth_request);
                }),
                catchError((err) => {
                    console.log("Error ", err);
                    return next.handle(request);
                })
            );
  }
}
