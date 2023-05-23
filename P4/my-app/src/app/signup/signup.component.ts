import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  submitSignup(name: String, email: String, username: String, password: String){
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "content-type" : "application/json"
      },
      body: JSON.stringify({name, email, username, password})
    })
    .then(() => {
      alert("Successfully registered !!!");
      window.location.href = "/login";
    })
    .catch((e) => {
      alert("Failed to register...");
      console.log(e);
    })

    return false;
  }
}
