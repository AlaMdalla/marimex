import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MarbleService } from 'src/app/services/marble.service';
import { Marble } from 'src/app/shared/models/marble';

@Component({
  selector: 'app-marble-page',
  templateUrl: './marble-page.component.html',
  styleUrls: ['./marble-page.component.css']
})
export class MarblePageComponent {
  marble!:Marble;
  constructor(activatedRoute:ActivatedRoute,marbleService:MarbleService,private cartServices:CartService,private router: Router){       //activatedRoute read the marble id from route page
    activatedRoute.params.subscribe((params)=>
    {
      if(params.id)    //params.id not null
 marbleService.getMarbleById(params.id).subscribe((serverMarble)=>{
  this.marble=serverMarble;
 });
 
    })
}
addToCart(){
this.cartServices.addToCart(this.marble);
this.router.navigateByUrl('cart-page');
}
}