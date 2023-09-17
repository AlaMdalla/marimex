import { AbstractControl } from "@angular/forms"

export const PasswordMatchValidator=(passwordCOntrolName:string,confirmPasswordMatchValidator:string)=>{

const Validator=(form:AbstractControl)=>{
    const passwordControl=form.get(passwordCOntrolName);
    const confirmPasswordControl=form.get(confirmPasswordMatchValidator);
    if(!passwordControl||!confirmPasswordControl) return;
    if(passwordControl.value!=confirmPasswordControl.value){
        confirmPasswordControl.setErrors({notMatch:true});
    }else{
        const errors=confirmPasswordControl.errors;
        if(!errors)return;
        delete errors.notMatch;
        confirmPasswordControl.setErrors(errors);
    }
} 
return Validator;
}