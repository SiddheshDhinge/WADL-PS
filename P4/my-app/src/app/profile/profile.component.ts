import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;
  constructor(){
    const userTmp = localStorage.getItem("user");
    if(userTmp){
      this.user = JSON.parse(userTmp);
    }
    else{
      window.location.href = "/login";
    }
  }
  submitLogout(){
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
}
