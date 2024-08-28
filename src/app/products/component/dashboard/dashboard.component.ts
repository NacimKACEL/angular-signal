import { Component, computed, inject } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatChipsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  productService = inject(ProductService);

  selectedProductsCount  = computed<number>( () => this.productService.getProducts()
                                                                      .filter(p => p.selected).length);
  selectedProductsPricetotal = computed<number>(  () => this.productService.getProducts()
                                                                           .filter(p => p.selected)
                                                                           .reduce((acc, p) => acc + p.price, 0));

  constructor() { }

}
