import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { Product } from './model/product';
import { MatButtonModule } from '@angular/material/button';
import { ProductService } from './service/product.service';
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { AddProductComponent } from "./component/add-product/add-product.component";

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatCardModule, MatTableModule, MatButtonModule, DashboardComponent, AddProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  productState= inject(ProductService);

  products = computed<Product[]>(() => this.productState.getProducts());

  

  displayedColumns: string[] = ['id', 'name', 'price', 'selected', 'action'];
  dataSource = this.products();

  constructor() { 
    effect(() => {
      console.log('products changed', this.products());
    });
  }

  ngOnInit(): void {
  }

  selectProduct(product: Product) {
    this.productState.selectProduct(product);
  }

  deleteProduct(product: Product) {
    this.productState.deleteProduct(product);
  }

}
