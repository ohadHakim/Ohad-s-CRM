import { Component, OnInit } from '@angular/core';
import { FilePath, Product } from '../shared/types';
import { ApiService } from '../core/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products!: Array<Product>;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.apiService.getProductsList().subscribe({
      next: (data: Array<Product>) => {
        this.products = data;
      },
      error: (err) => console.error(err),
    });
  }

  imagePath(image: string | null): string {
    return !image ? '' : `../../assets/images/${image}`;
  }

  productsTotal(): number {
    return this.products ? this.products.length : 0;
  }

  exportProductsData() {
    this.apiService.exportProducts().subscribe({
      next: (data: FilePath) => {
        window.open(`${environment.serverUrl}/${data.name}`);
      },
      error: (err) => console.error(err),
    });
  }
}
