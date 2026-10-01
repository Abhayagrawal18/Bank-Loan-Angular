import { Component, inject, signal } from '@angular/core';
import { ILoanApplicationList , UserModel } from '../../models/User.Model';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.model';
import { DatePipe, SlicePipe } from '@angular/common';

@Component({
  selector: 'app-application-list',
  imports: [SlicePipe , DatePipe],
  templateUrl: './application-list.html',
  styleUrl: './application-list.css',
})
export class ApplicationList {
  loggedUser!: UserModel;
  applicationList = signal<ILoanApplicationList[]>([])
  masterSrv = inject(Master);
  

  constructor(){
    const local = localStorage.getItem('bankloanuser');

    if(local != null){
      this.loggedUser = JSON.parse(local);

      if(this.loggedUser.role == 'Customer'){
        this.getCustomerApplications()
      }
      else{
        this.getAssignedApplications()
      }
    }
  }

  getCustomerApplications(){
    this.masterSrv.getMyApplications(this.loggedUser.userId).subscribe({
      next: (res: IApiResponseModel) => {
         this.applicationList.set(res.data)
      }
    })
  }

  getAssignedApplications(){
    this.masterSrv.getAssignedApplications(this.loggedUser.userId).subscribe({
      next: (res: IApiResponseModel) => {
         this.applicationList.set(res.data)
      }
    })
  }

  changeStatus(panCard: string , status: string){
     this.masterSrv.checkStatus(panCard , status).subscribe({
      next: (res:IApiResponseModel) => {
        alert("Status has been changed ")
      }
     })
  }
}
