import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  cart = signal<Product[]>([]);
  total = computed(()=>{
    const cart = this.cart();
    return cart.reduce((total , product)=>total+product.price,0);
  })
  

  constructor() { }

  addTocart(product: Product){
    this.cart.update(state => [...state, product] )
  }
}
