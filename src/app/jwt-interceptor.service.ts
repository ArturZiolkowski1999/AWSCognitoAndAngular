import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Auth } from 'aws-amplify';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return from(Auth.currentSession())
            .pipe(
                switchMap((auth: any) => { // switchMap() is used instead of map().

                    let jwt = auth.accessToken.jwtToken;
                    let idToken = auth.idToken.jwtToken;
                    let with_auth_request = request.clone({
                        setHeaders: {
                            Authorization: `Bearer ${jwt}`
                        },
                        body: {
                          ...request.body,
                          idToken: idToken
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
