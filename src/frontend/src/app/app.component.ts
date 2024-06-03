import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blockchain-shop-front-shell';
  user$ = this.auth.user$;

  constructor(@Inject(DOCUMENT) private doc: Document, public auth: AuthService) { }

}
