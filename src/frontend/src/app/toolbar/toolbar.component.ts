import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss',
  animations: [
    trigger('fieldUpdated', [
      state('normal', style({
        transform: 'translateX(0)'
      })),
      state('updated', style({
        transform: 'translateX(20px)'
      })),
      transition('normal <=> updated', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class ToolbarComponent {
  title = 'blockchain-shop-front-shell';
  user$ = this.auth.user$;
  clicks: number = 0;
  fieldState = 'normal';

  constructor(@Inject(DOCUMENT) private doc: Document, public auth: UserService) {
    window.addEventListener(
      "message",
      (event) => {
        console.log('message', event);
        if (event.data.topic === 'micro-frontend') {
          if (event.data.command === 'addToCart') {
            this.addToCart();
          } else if (event.data.command === 'removeFromCart') {
            this.removeFromCart();
          }
        }
      },
      false,
    );
    this.auth.balance$.subscribe((balance) => {
      this.fieldState = 'updated';
      setTimeout(() => {
        this.fieldState = 'normal';
      }, 300);
    });
  }
  ngOnInit(): void {

  }
  login(): void {
    // Call this to redirect the user to the login page
    //alert('login');
    this.auth.loginWithPopup();
  }

  logout(): void {
    // Call this to redirect the user to the login page
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin
      }
    });
  }

  addToCart(): void {
    // Call this to redirect the user to the login page
    this.clicks++;
  }
  removeFromCart(): void {
    // Call this to redirect the user to the login page
    if (this.clicks > 0)
      this.clicks--;
  }

  reloadBalance(): void {
    this.auth.reloadBalance();
  }
}
