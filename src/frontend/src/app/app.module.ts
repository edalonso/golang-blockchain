import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@auth0/auth0-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HttpClientModule } from '@angular/common/http';
import { ToolbarModule } from './toolbar/toolbar.module';
import { ProductsService } from './services/products.service';
import { PokemonClient } from 'pokenode-ts';
import { VendorsService } from './services/vendors.service';
import { BlockchainService } from './services/blockchain.service';
import { UserService } from './services/user.service';
import { RouterModule } from '@angular/router';
import { BuyComponent } from './buy/buy.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    BuyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    MatGridListModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    BrowserAnimationsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'blockchain-app.eu.auth0.com',
      clientId: 'P4DLrTwpiNvwL0twO4oCmYULfc2HHveY',
      authorizationParams: {
        redirect_uri: window.location.origin,
        scope: 'openid profile email user_metadata app_metadata picture'
      },
      cacheLocation: "localstorage"
    }),
    HttpClientModule,
    ToolbarModule
  ],
  providers: [
    provideAnimationsAsync(),
    UserService,
    ProductsService,
    VendorsService,
    BlockchainService,
    PokemonClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
