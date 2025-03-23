import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PollingService {
  constructor(private http: HttpClient) { }

  pollApiGet(url: string, intervalMs: number): Observable<any> {
    return interval(intervalMs).pipe(
      switchMap(() => this.http.get<any>(url))
    );
  }
  pollApiPost(url: string, intervalMs: number, body: any): Observable<any> {
    return interval(intervalMs).pipe(
      switchMap(() => this.http.post<any>(url, body))
    );
  }

  pollMethod(method: () => Observable<any>, intervalMs: number): Observable<any> {
    return interval(intervalMs).pipe(
      switchMap(() => method())
    );
  }
}
