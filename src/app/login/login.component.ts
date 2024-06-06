import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

    loginSuccess:boolean=false;

    loginError:string='';
        constructor(private fb:FormBuilder,private api:ApiService,private loginRouter:Router){}
  
        loginForm=this.fb.group({
          acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
          password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]],
        })

         //form control passed to html form
        login(){
          if(this.loginForm.valid){
            console.log(this.loginForm.value);
            let acno=this.loginForm.value.acno
            let password=this.loginForm.value.password
            
            console.log(acno,password);
            this.api.login(acno,password).subscribe((response:any)=>{
              console.log(response);
              //success
              this.loginSuccess=true

              //to set current username into the local storage
              localStorage.setItem('currentUser',response.currentUser)

              //to set current balance into the local storage
              localStorage.setItem('balance',response.balance)
              
              
               //to set currentAcno into the local storage
               localStorage.setItem('currentAcno',response.currentAcno)

               //to set token into the local storage
               localStorage.setItem('token',response.token)


              //alert('Login Successful');
              setTimeout(() => {
                this.loginRouter.navigateByUrl('/dashboard')
              },2000);
              

            },
            (response:any)=>{
                this.loginError=response.error.message
                setTimeout(()=>{
                  this.loginForm.reset();
                  this.loginError=('')
                },3000);
            })
            
            }
           else{
            alert('Invalid Form');
           }
          
        }

}
