import { Marble } from "./marble"

export class CartItem{
    constructor(public marbel:Marble){
      //  this.mable= marbel;
    }
    quantity:number= 1;
    price:number= this.marbel.price;

}