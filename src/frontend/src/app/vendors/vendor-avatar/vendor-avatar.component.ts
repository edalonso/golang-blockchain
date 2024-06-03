import { Component, Input } from '@angular/core';
import { Vendor } from '../../services/vendors.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'vendor-avatar',
  templateUrl: './vendor-avatar.component.html',
  styleUrl: './vendor-avatar.component.scss',

})
export class VendorAvatarComponent {
  @Input() vendor: Vendor = new Vendor();

}
