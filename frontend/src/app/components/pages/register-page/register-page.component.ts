import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { IUserRegister } from 'src/app/shared/interfaces/IuserRegister';
import { PasswordMatchValidator } from 'src/app/shared/validators/password_match_validator';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})

export class RegisterPageComponent {
  RegisterForm!:FormGroup;
  isSubmited=false;
  returnURL='';
  constructor(
    private formBuilder:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router
  ){

  }
  ngOnInit(): void {
    this.RegisterForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      ConfirmPassword: ['', Validators.required],
     
    },{
      validators: PasswordMatchValidator('password','ConfirmPassword')
    });

    this.returnURL= this.activatedRoute.snapshot.queryParams.returnUrl;
  }
  
get fc(){
  return this.RegisterForm.controls;    //fc form controls function bch to93odec tekoi feha RegisterForm.controls.email
 
 }   
 submit(){
   this.isSubmited=true;
   if(this.RegisterForm.invalid)return;
 
   const fv=this.RegisterForm.value;
   const user:IUserRegister={
    name:fv.name,
    email:fv.email,
    password:fv.password,
    ConfirmPassword:fv.ConfirmPassword,

   }
   this.userService.Register(user).subscribe(_=>{
    this.router.navigateByUrl(this.returnURL);
   })
 }     
   
}
