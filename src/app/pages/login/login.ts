import { Component, inject } from '@angular/core';
import { UserLoginModel } from '../../models/User.Model';
import { FormsModule } from '@angular/forms';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj : UserLoginModel = new UserLoginModel();
  
  masterService = inject(Master);
  router = inject(Router)

  onLoginUser(){
    this.masterService.onLogin(this.loginObj).subscribe({
      next:(res : IApiResponseModel) => {
        // console.log(res)
        if(res.result){
          debugger;
          alert('User Found , Logging.. in');
          localStorage.setItem('bankloanuser' , JSON.stringify(res.data));
          this.masterService.loginSubject$.next();
          this.router.navigateByUrl('/home')
        }
        else{
          alert(res.message);
        }
      },
    })
  }
}
