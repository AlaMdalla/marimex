import { Injectable } from '@angular/core';
import { Cart } from '../shared/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Marble } from '../shared/models/marble';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart=this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart>= new BehaviorSubject(this.cart);

  constructor() { }
  addToCart(marble:Marble):void{ //=> 3ibara 3ala where
let cartItem=this.cart.items
.find(item =>item.marbel.id===marble.id)
if(cartItem)
return;
this.cart.items.push(new CartItem(marble));
this.setCartToLocalStorag();
  }
  remouveFromCart(marbelid:string):void{
    this.cart.items=this.cart.items
    .filter(item =>item.marbel.id!=marbelid);
    this.setCartToLocalStorag();
  }
  changeQauntity(marbelid:string ,quantity:number){
    let cartItem=this.cart.items
    .find(item =>item.marbel.id===marbelid);
    if(!cartItem) return;
    cartItem.quantity=quantity;
    cartItem.price=quantity*cartItem.marbel.price;
    this.setCartToLocalStorag();

  }
  clearCart(){
    this.cart=new Cart();
    this.setCartToLocalStorag();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }
  private setCartToLocalStorag():void{
    this.cart.totalPrice=this.cart.items
    .reduce((prevSum, CurrentItem)=>prevSum+CurrentItem.price,0)//. howa el default mta3 el privious sum ou 3ala 9ad matzid hajet y3aytelha
    this.cart.totalCount=this.cart.items
    .reduce((prevSum, CurrentItem)=>prevSum+CurrentItem.quantity,0)
    const cartJson=JSON.stringify(this.cart);
    localStorage.setItem('Cart',cartJson);
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage():Cart{
    const cartJson=localStorage.getItem('Cart');//Cart nafsha mta3 el function eli 9balaha
      return cartJson? JSON.parse(cartJson):new Cart();//:new Cart(); mena tabda el else
  }
}
