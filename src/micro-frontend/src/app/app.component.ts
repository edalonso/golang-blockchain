import { Component, EnvironmentInjector, inject, runInInjectionContext } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'micro-frontend';

  public addToCart(event: Event) {

    const evento = { topic: 'micro-frontend', command: 'addToCart', data: { date: new Date(), evento: event.timeStamp } };
    window.postMessage(evento, '*');
  }
  public removeFromCart(event: Event) {

    const evento = { topic: 'micro-frontend', command: 'removeFromCart', data: { date: new Date(), evento: event.timeStamp } };
    window.postMessage(evento, '*');
  }
}
