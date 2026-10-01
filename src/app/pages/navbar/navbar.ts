import { Component , inject} from '@angular/core';
import { RouterLink  , Router} from '@angular/router';
import { UserModel } from '../../models/User.Model';
import { Master } from '../../services/master';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  loggedUserData! : UserModel | any
  router = inject(Router)
  masterSrv = inject(Master)
  
  constructor(){
    this.readLoggedUserData();
    this.masterSrv.loginSubject$.subscribe({
      next: () => {
        this.readLoggedUserData();
      }
    });
  }

  readLoggedUserData(){
    const localData = localStorage.getItem('bankloanuser');
    if(localData != null){
      this.loggedUserData = JSON.parse(localData);
    }
  }

  onLogOff(){
    localStorage.removeItem('bankloanuser');
    this.loggedUserData = null;
    this.router.navigate(['/home'])
  }

}
