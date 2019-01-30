import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-unit-testing',
  templateUrl: './unit-testing.component.html',
  styleUrls: ['./unit-testing.component.css']
})
export class UnitTestingComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.wrongSignIn()
  }

  /* Tests des services d'authentification */
  rightSignIn(){

  }

  wrongSignIn(){
    let html_element = document.createElement("p")
    html_element.id = "wrongSignIn";
    this.authService.signInUser("alexandre@volvic.fr", "alexandre").catch(
      (error) => {
        html_element.innerText = error.message
        document.getElementById("tests").after(html_element)
      }
    )
  }
}
