import { CommonModule } from '@angular/common';
import { Component,inject, Input, signal, SimpleChange, SimpleChanges } from '@angular/core';
import { ProductComponent } from '@products/components/product/product.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-list',
  standalone:true,
  imports: [CommonModule,ProductComponent,RouterLinkWithHref,RouterLinkActive],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private productService = inject(ProductService)
  private cartService = inject(CartService)
  private categoryService = inject(CategoryService)
  @Input() category_id?: string;
  ngOnInit(){
    this.getCategories();
  }
  ngOnChanges(changes:SimpleChanges){
      this.getProducts();
  }

  addToCart(product: Product){
    this.cartService.addTocart(product);
  } 
  private getProducts(){
    this.productService.getProducts(this.category_id)
    .subscribe({
      next: (products)=> {
        this.products.set(products);
      },
      error: ()=>{
        "made a mmistake"
      }
    })
  } 
  private getCategories(){
    this.categoryService.getAll()
    .subscribe({
      next: (data)=> {
        this.categories.set(data);
      },
      error: ()=>{
        "made a mmistake"
      }
    })
  }
}
