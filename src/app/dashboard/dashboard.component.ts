import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
   
  deleteSuccessMsg: string = '';
  deleteConfirmStatus: boolean = false; //delete confirmation content

  acno:any//for parent to child data communication

  transferSuccess:string='';
  transferError:string='';

  user:string=''//to hold the current user name
  balance:string=''; //to hold the current balance
  currentAcno:string=''; //to hold the current Acno
  isCollapse: boolean=false
constructor(private fb:FormBuilder, private api:ApiService,private logoutRouter:Router){}
  


ngOnInit(): void {


  if(!localStorage.getItem("token")){
    alert("please login")
    this.logoutRouter.navigateByUrl('')
  }

    if(localStorage.getItem('currentUser')){
    this.user=localStorage.getItem('currentUser')||'';//current user
    }
    // if(localStorage.getItem('balance')){
    //   this.balance=localStorage.getItem('balance')||'';//balance
    //   }
    if(localStorage.getItem('currentAcno')){
      this.currentAcno=localStorage.getItem('currentAcno')||'';
    }
  }

  collapse(){
    this.isCollapse=!this.isCollapse
  }
//create a formgroup and array
FundTransferForm=this.fb.group({
  creditAcno:['',[Validators.required,Validators.pattern('[0-9]*')]],
  amount:['',[Validators.required,Validators.pattern('[0-9]*')]],
  password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
})
//control passed through html form
 //fund transfer
dashboardForm(){
  if(this.FundTransferForm.valid){
    //fund transfer
    let creditAcno = this.FundTransferForm.value.creditAcno;
    let password = this.FundTransferForm.value.password;
    let amount = this.FundTransferForm.value.amount;

    this.api.fundTransfer(creditAcno,password,amount).subscribe((result:any)=>{
      console.log(result);
      this.transferSuccess=result.message
      setTimeout(() => {
          this.transferSuccess=''
          this.FundTransferForm.reset()
      }, 3000);
    },
    (result:any)=>{
      console.log(result.error.message);
      this.transferError=result.error.message
      setTimeout(() => {
        this.transferError=''
        this.FundTransferForm.reset()
    }, 3000);
    }
  )
   // alert('Form Clicked')

  }

  else{
    alert('Please enter a valid parameters')
  }
    
  }

  getBalance(){
    this.api.getBalance(this.currentAcno).subscribe((result:any)=>{
      this.balance=result.balance
    },
    (result:any)=>{
        alert(result.error.message)
    })
}
reset(){
  this.FundTransferForm.reset()
  
}

logout(){
  this.logoutRouter.navigateByUrl('')
  localStorage.clear()
}

deleteAccount(){
  //data to be shared with the child account
  this.acno=localStorage.getItem('currentAcno') //12

  this.deleteConfirmStatus=true
}
  
cancelDeleteConfirm(){
  this.acno=''
  this.deleteConfirmStatus=false
}

deleteFromParent(){
  this.api.deleteAccount().subscribe((result:any)=>{
    localStorage.clear()//Remove all the account details from the local storage
    this.deleteSuccessMsg=result.message//Account deleted successfully message
    setTimeout(()=>{
      this.logoutRouter.navigateByUrl('')//redirected to login page
    },3000)
   
  })
}
}

