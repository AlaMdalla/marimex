import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarbleService } from 'src/app/services/marble.service';
import { ImarbelAdd } from 'src/app/shared/interfaces/ImarblesAdd';

@Component({
  selector: 'marbels-add',
  templateUrl: './marbels-add.component.html',
  styleUrls: ['./marbels-add.component.css']
})
export class MarbelsAddComponent {

  addForm!:FormGroup;
  isSubmited=false;
  returnURL='';
  constructor(
    private formBuilder:FormBuilder,private marbelservice:MarbleService,private activatedRoute:ActivatedRoute,private router:Router
  ){

  }
  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required]],
      tags: ['', [Validators.required, Validators.minLength(5)]],
      favorite: ['', [Validators.required]],
      stars: ['', [Validators.required]],
      imageurl:['', [Validators.required]],
      descriptions:['', [Validators.required]],
    
     
    });

    this.returnURL= this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  
get fc(){
  return this.addForm.controls;    //fc form controls function bch to93odec tekoi feha addForm.controls.email
 
 }   
 submit(){
   this.isSubmited=true;
   if(this.addForm.invalid)return;
 
   const fv=this.addForm.value;
   const marbel:ImarbelAdd={
    name:fv.name,
    price:fv.price,
    tags:fv.tags,
    favorite:fv.favorite,
    stars:fv.stars,
    imageurl:fv.imageurl,
    descriptions:fv.descriptions,
   

   }
   this.marbelservice.ADD_Marble(marbel).subscribe(_=>{
    this.router.navigateByUrl(this.returnURL);
   })
 }     
   
}
