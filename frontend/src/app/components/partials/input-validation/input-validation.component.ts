import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';
const VALIDATOR_MESSAGE:any={
required:'Should not be empty',
email:'Email is not valid',

notMatch:'Password and Confirm does not match',
minlength:'Filed is too short',
}
@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrls: ['./input-validation.component.css']
})
export class InputValidationComponent implements OnInit, OnChanges {
ngOnChanges(_changes: SimpleChanges): void {
  this.checkValidation();
}
ngOnInit(): void {
this.control.statusChanges.subscribe(()=>
{
  this.checkValidation();
});
this.control.valueChanges.subscribe(()=>
{
  this.checkValidation();
});  }
@Input()
control!:AbstractControl;
@Input()
showErrorwhen:boolean=true;
errorMessages:string[]=[];
checkValidation(){
  const errors=this.control.errors;
  if(!errors){
    this.errorMessages=[];
    return;
  }
  const errorKeys=Object.keys(errors);// example:['required','email']
  this.errorMessages=errorKeys.map(key => VALIDATOR_MESSAGE[key]);
}
}
