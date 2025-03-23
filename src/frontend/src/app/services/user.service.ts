import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { BlockchainService } from './blockchain.service';
import { BehaviorSubject } from 'rxjs';
import { PollingService } from './polling.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: null | User = null;
  user$ = this.auth.user$;
  wallet = ''
  wallet$ = new BehaviorSubject<string>(this.wallet);
  isAuthenticated$ = this.auth.isAuthenticated$;
  balance: number = 0;
  balance$ = new BehaviorSubject<number>(this.balance);

  constructor(private auth: AuthService, private blockchain: BlockchainService, private pollingService: PollingService) {
    this.auth.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.wallet = user['wallet'];
        this.wallet$.next(this.wallet);
        this.blockchain.getBalance(this.wallet).subscribe((balance) => {
          this.changeBalance(balance);
        });
        this.pollingService.pollMethod(() => this.blockchain.getBalance(this.wallet), 10000).subscribe((balance) => {
          this.changeBalance(balance);
        });
      }
    });
  }

  loginWithPopup() {
    this.auth.loginWithPopup();
  }

  logout(options?: any) {
    this.auth.logout(options);
  }

  reloadBalance() {
    this.blockchain.getBalance(this.wallet).subscribe((balance) => {
      this.changeBalance(balance);
    });
  }

  private changeBalance(balance: number) {
    if (this.balance != balance) {
      console.log('balance', balance, new Date());
      this.balance = balance;
      this.balance$.next(this.balance);
    }
  }

}
