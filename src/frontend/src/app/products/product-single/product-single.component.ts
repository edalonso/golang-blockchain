import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { BuyComponent } from '../../buy/buy.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrl: './product-single.component.scss',
})
export class ProductSingleComponent implements OnChanges {

  @Input() product: any;
  public productComplet: any;

  constructor(private productosService: ProductsService, private dialog: MatDialog) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.productosService.getProductByName(this.product.name).then(product => {
        this.productComplet = product;
      });
    }
  }

  buyConfirmation(product: any) {
    const dialogRef = this.dialog.open(BuyComponent, {
      data: { product },
      width: '1050px',
      //height: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
