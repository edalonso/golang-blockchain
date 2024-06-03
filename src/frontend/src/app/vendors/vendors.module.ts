import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorAvatarComponent } from './vendor-avatar/vendor-avatar.component';
import { AvatarModule } from 'ngx-avatars';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    VendorAvatarComponent
  ],
  imports: [
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    AvatarModule,
    CommonModule
  ],
  exports: [
    VendorAvatarComponent
  ]
})
export class VendorsModule { }
