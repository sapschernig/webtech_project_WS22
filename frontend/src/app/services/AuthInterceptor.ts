import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isAdmin = false;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const sessionId = sessionStorage.getItem('sessionId');
    if (sessionId) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${sessionId}`
        }
      });
    }

    return next.handle(request).pipe(
      tap(
        event => {},
        error => {
          if (error.status === 401) {
            sessionStorage.removeItem('sessionId');
            this.isAdmin = false;
          }
        }
      )
    );
  }

  public getIsAdmin(): boolean {
    return this.isAdmin;
  }

  public setIsAdmin(email: string): void {
    this.isAdmin = email === 'admin@starcinema.at';
  }
}
