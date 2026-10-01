import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-customer',
  imports: [FormsModule],
  templateUrl: './register-customer.html',
  styleUrl: './register-customer.css',
})
export class RegisterCustomer {
  newUserObj: any = {
     
   "userId": 0,
   "userName": "",
   "emailId": "",
   "fullName": "",
   "password": ""
      
  };
  masterService = inject(Master);
  router = inject(Router);
  
  onSaveCustomer(){
    debugger;
     this.masterService.onRegisterCustomer(this.newUserObj).subscribe({
          next:(res:any) => {
            debugger;
             if(res.result){
              alert("Customer registered successfully , Use login page to login");
              this.router.navigateByUrl('/login');
             }
             else{
              alert(res.message);
             }
          },
          error:(err:any) =>{
            alert("API error")
          }
     })
  }
}
