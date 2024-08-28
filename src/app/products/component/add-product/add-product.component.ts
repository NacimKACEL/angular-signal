import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ProductService } from '../../service/product.service';
import { Product } from '../../model/product';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatTableModule, MatFormField, MatLabel],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  formBuilder = inject(FormBuilder);
  productService = inject(ProductService);

  productForm! : FormGroup;

  constructor() { }

  ngOnInit() {
    this.productForm = new FormGroup({
      name : this.formBuilder.control(''),
      price : this.formBuilder.control(0),
      selected : this.formBuilder.control(false)
    });
  }


  onSubmit() {
    let product : Product= {
      id : new Date().getTime(),
      name : this.productForm.value.name,
      price : parseFloat(this.productForm.value.price),
      selected : this.productForm.value.selected
    }
    this.productService.addProduct(product);
  }

}
