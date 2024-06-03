import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PollingService } from './polling.service';

@Injectable({
  providedIn: 'root'
})
export class BlockchainService {

  public wallets$ = new Subject<any[]>();
  private baseUrl = 'http://localhost:30000/api/v1';

  constructor(private http: HttpClient, private pollingService: PollingService) {
    this.getWallets();
  }

  public getWallets() {
    this.http.get(`${this.baseUrl}/getwallets`)
      .subscribe((data) => {
        let datos = Array.from(data as any[]);
        datos.shift();
        this.wallets$.next(datos);
      }, (error) => { console.log(error) });
  }

  public getBalance(wallet: string): Observable<number> {
    return this.http.post(`${this.baseUrl}/getbalance`, {
      address: wallet
    }) as Observable<number>;
  }

  public sendTransaction(walletFrom: string, amount: number, walletTo: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/sendtransaction`, {
      from: walletFrom,
      amount: amount,
      mineNow: false,
      to: walletTo
    });
  }

}
