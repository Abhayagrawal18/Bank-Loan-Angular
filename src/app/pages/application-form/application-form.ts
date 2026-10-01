import { Component, inject } from '@angular/core';
import { FormControl, FormGroup , FormArray, ReactiveFormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Master } from '../../services/master';
import { IApiResponseModel } from '../../models/API.Response.model';
import { Router } from '@angular/router';
import { UserModel } from '../../models/User.Model';


@Component({
  selector: 'app-application-form',
  imports: [ReactiveFormsModule , NgFor],
  templateUrl: './application-form.html',
  styleUrl: './application-form.css',
})
export class ApplicationForm {
  applicationForm!: FormGroup

  masterSrv = inject(Master);
  router = inject(Router);
  
  loggedUserData!: UserModel;

  constructor() {

    const local = localStorage.getItem('bankloanuser');
    if(local != null){
      this.loggedUserData = JSON.parse(local);
    }

    this.initializeForm();

  }
  
initializeForm(){
  this.applicationForm = new FormGroup({

  applicantID: new FormControl(0),

  fullName: new FormControl(''),

  applicationStatus: new FormControl(''),

  panCard: new FormControl(''),

  dateOfBirth: new FormControl(''),

  email: new FormControl(''),

  phone: new FormControl(''),

  address: new FormControl(''),

  city: new FormControl(''),

  state: new FormControl(''),

  zipCode: new FormControl(''),

  annualIncome: new FormControl(0),

  employmentStatus: new FormControl(''),

  creditScore: new FormControl(0),

  assets: new FormControl(''),

  dateApplied: new FormControl(new Date()),

  customerId: new FormControl(this.loggedUserData.userId),

  Loans: new FormArray([]),

  });

    this.addNewLoanForm();
 }

 addNewLoanForm(){
  this.loanDetails.push(this.addNewLoan());
 }

 get loanDetails(){
  return this.applicationForm.get('Loans') as FormArray
 }
 
 addNewLoan() {

  return new FormGroup({

    loanID: new FormControl(0),

    applicantID: new FormControl(0),

    bankName: new FormControl(''),

    loanAmount: new FormControl(""),

    emi: new FormControl(0)

  });

}

onSaveApplication(){
    debugger;
     const formValue = this.applicationForm.value;
     this.masterSrv.saveLoanApplication(formValue).subscribe({
       next: (res : IApiResponseModel) => {
          if(res.result == true){
            alert("Application submitted successfully");
            this.router.navigateByUrl('/application-list');
          }
          else{
            alert(res.message);        
          }
       }
     })
   }

}
