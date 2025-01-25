import { CommonModule } from '@angular/common';
import { Component, Input, Output,EventEmitter} from '@angular/core';
import { RouterLinkWithHref } from '@angular/router';
import { Product } from '@shared/models/product.model';
import { TimeAgoPipe } from '@shared/pipes/time-ago.pipe';

@Component({
  selector: 'app-product',
  standalone:true,
  imports: [CommonModule,TimeAgoPipe,RouterLinkWithHref],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
 
 @Input({required:true}) product!: Product;
 @Output() addToCart = new EventEmitter();

addToCartHandler(){
  console.log('click form child');
  this.addToCart.emit(this.product)
  
}


}
