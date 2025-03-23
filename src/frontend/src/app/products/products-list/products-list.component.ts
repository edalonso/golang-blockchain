import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent {
  gridColumns = 5;
  products: any = [];
  productsCount = 0;
  page = 0;
  limit = 20;

  constructor(private productosService: ProductsService) {
    this.productosService.productsCount$.subscribe(count => {
      this.productsCount = count;
    });
  }

  ngOnInit() {
    this.cargaProductos();
  }

  async cargaProductos(page: number | null = null) {
    if (page == null) {
      page = this.page;
    }
    await this.productosService.getProductsList(page * this.limit, this.limit)
      .then(products => {
        this.products = products;
      });
  }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }

  async cambiarPagina(event: any) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    await this.cargaProductos();
  }
}
