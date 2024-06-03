import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, of } from 'rxjs';
import { BlockchainService } from './blockchain.service';

export class Vendor {
  public id: number = 0;
  public name: string = "";
  public image: string = "";
  public wallet: string = "";
}

@Injectable({
  providedIn: 'root'
})
export class VendorsService {

  private vendorsAlmacen: any[] = [];
  public vendors: Map<number, Vendor> = new Map<number, Vendor>();

  constructor(private blockchainService: BlockchainService) {
    this.vendorsAlmacen = [
      { id: 1, name: "Jon Snow", image: "https://thronesapi.com/assets/images/jon-snow.jpg", wallet: null },
      { id: 2, name: "Daenerys Targaryen", image: "https://thronesapi.com/assets/images/daenerys.jpg", wallet: null },
      { id: 3, name: "Arya Stark", image: "https://thronesapi.com/assets/images/arya-stark.jpg", wallet: null },
      { id: 4, name: "Sansa Stark", image: "https://thronesapi.com/assets/images/sansa-stark.jpeg", wallet: null },
      { id: 5, name: "Brandon Stark", image: "https://thronesapi.com/assets/images/bran-stark.jpg", wallet: null },
      { id: 6, name: "Ned Stark", image: "https://thronesapi.com/assets/images/ned-stark.jpg", wallet: null },
      { id: 7, name: "Robert Baratheon", image: "https://thronesapi.com/assets/images/robert-baratheon.jpeg", wallet: null },
      { id: 8, name: "Jamie Lannister", image: "https://thronesapi.com/assets/images/jaime-lannister.jpg", wallet: null },
      { id: 9, name: "Cersei Lannister", image: "https://thronesapi.com/assets/images/cersei.jpg", wallet: null },
      { id: 10, name: "Cateyln Stark", image: "https://thronesapi.com/assets/images/catelyn-stark.jpg", wallet: null },
    ];

    blockchainService.wallets$
      .subscribe(wallets => {
        this.vendorsAlmacen.map(vendor => {
          const randomIndex = Math.floor(Math.random() * wallets.length);
          vendor.wallet = wallets[randomIndex].Address;
        });
        this.vendors = new Map<number, Vendor>(Array.from(this.vendorsAlmacen).map((value) => [value.id, value]));
      })
    this.blockchainService.getWallets();
  }

  async getVendorById(id: number) {
    return this.vendors.get(id);
  }

  async getVendorsList() {
    return Array.from(this.vendors.values());
  }

  getRandomVendor() {
    return this.vendors.get(Math.floor(Math.random() * this.vendors.size) + 1);
  }

  getVendors(): Observable<any> {
    return of(this.vendors);
  }

}
