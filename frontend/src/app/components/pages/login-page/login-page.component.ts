import { Component, importProvidersFrom } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
loginForm!:FormGroup;
isSubmited=false;
returnURL='';
  userSubject: any;
constructor(private formBuilder:FormBuilder,private userService:UserService,private activatedRoute:ActivatedRoute,private router:Router){}
ngOnInit():void{
  this.loginForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });
  this.returnURL=this.activatedRoute.snapshot.queryParams.returnURL;                                        //snapshot:latest value of activatedRoute

}
get fc(){
 return this.loginForm.controls;    //fc form controls function bch to93odec tekoi feha loginForm.controls.email

}   
submit(){
  this.isSubmited=true;
  if(this.loginForm.invalid)return;

  this.userService.login({email:this.fc.email.value,password:this.fc.password.value}).subscribe((user)=>{
    if(user.isAdmin){
      this.returnURL='admin';
    }
    this.router.navigateByUrl(this.returnURL);
  });
}     
  
}