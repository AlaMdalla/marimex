import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/Cart';
import { CartItem } from 'src/app/shared/models/cartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {

  cart!:Cart;
  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe  ((cart)=>{  // subscribe ma el chay hedha l'exécution continue de l'observable.
    this.cart=cart;




    })          
  }
  removeFromCart(cartItem:CartItem){
    this.cartService.remouveFromCart(cartItem.marbel.id);
  }
  changeQuantity(cartItem:CartItem,quantityInString: string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQauntity(cartItem.marbel.id,quantity);
  }


}
