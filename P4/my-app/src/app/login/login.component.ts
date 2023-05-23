import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  submitLogin(username: String, password: String){
    fetch("http://localhost:3000/users")
    .then((data) => data.json())
    .then((data) => {
      const user = data.find((element: any) => {
        return element.username == username && element.password == password
      });

      if(user){
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/";
      }
      else{
        alert("Wrong credentials...");
      }

    })

    return false;
  }
}
