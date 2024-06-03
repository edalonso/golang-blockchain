import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { BlockchainService } from '../services/blockchain.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrl: './buy.component.scss'
})
export class BuyComponent {
  public user$ = this.user.user$;
  public wallet$ = this.user.wallet$;

  constructor(private dialogRef: MatDialogRef<BuyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { product: any },
    private user: UserService,
    private blockchain: BlockchainService,
  ) { }

  buy() {
    console.log('buy', this.data.product.price, this.data.product);
    this.blockchain.sendTransaction(this.user.wallet, this.data.product.price, this.data.product.vendor.wallet).subscribe((data) => {
      this.user.reloadBalance();
      this.dialogRef.close();
    });
  }
  close() {
    this.dialogRef.close();
  }
}
