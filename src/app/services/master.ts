import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILoanApplication, UserLoginModel } from '../models/User.Model';
import { IApiResponseModel } from '../models/API.Response.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Master {
  http = inject(HttpClient);
  api_url = "https://projectapi.gerasim.in/api/BankLoan/";
  loginSubject$ : Subject<void> = new Subject<void>();

  onRegisterCustomer(obj: any){
    return this.http.post(this.api_url + "RegisterCustomer", obj)
  }
   
  onLogin(loginObj : UserLoginModel): Observable<IApiResponseModel>{
    return this.http.post<IApiResponseModel>(`${this.api_url}login`,loginObj)
  }

  saveLoanApplication(obj: ILoanApplication): Observable<IApiResponseModel>{
     return this.http.post<IApiResponseModel>(`${this.api_url}AddNewApplication` , obj)
  }

  getMyApplications(id: number):Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>(`${this.api_url}GetMyApplications?customerId=${id}`)
  }

  getAssignedApplications(id: number): Observable<IApiResponseModel> {
    return this.http.get<IApiResponseModel>(`${this.api_url}GetApplicationAssigneedToMe?bankEmployeeId=${id}`);
  }

  checkStatus(pano: string , status : string): Observable<IApiResponseModel>{
    return this.http.get<IApiResponseModel>(`${this.api_url}CheckApplicationStatus?panNo=${pano}&status=${status}`)
  }
}
