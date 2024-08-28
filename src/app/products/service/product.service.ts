import { Injectable, signal } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  productsState = signal<Product[]>([]);

  constructor() { 
    this.productsState.set([
      { id: 1, name: 'M3 Max', price: 4000, selected: false },
      { id: 2, name: 'Iphone 15', price: 1200, selected: true },
      { id: 3, name: 'pluralsight', price: 30, selected: false }
    ]);
  }

  getProducts() {
    return this.productsState();
  }

  selectProduct(product: Product) {
    this.productsState.update( prds => prds.map( p => p.id == product.id ? {...p, selected : !p.selected} : p));
  }

  deleteProduct(product: Product) {
    this.productsState.update( prds => prds.filter( p => p.id != product.id));
  }

  addProduct(product: Product) {
    this.productsState.update( prds => [...prds, product]);
  }
}
