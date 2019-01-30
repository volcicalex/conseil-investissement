import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-unit-testing',
  templateUrl: './unit-testing.component.html',
  styleUrls: ['./unit-testing.component.css']
})
export class UnitTestingComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.rightSignIn()
    this.wrongSignIn()
    this.wrongCreateUser()
  }

  /* Tests des services d'authentification */
  rightSignIn(){
    let html_element = document.createElement("p")
    html_element.id = "rightSignIn";
    this.authService.signInUser("unit@testing.com", "unittesting").then(
      () => {
        html_element.innerText = "Test reussi"
        html_element.style.color = "green"
        document.getElementById("tests").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: " + error.message
        html_element.style.color = "red"
        document.getElementById("tests").appendChild(html_element)
      }
    )
  }

  wrongSignIn(){
    let html_element = document.createElement("p")
    html_element.id = "wrongSignIn";
    this.authService.signInUser("alexandre@volvic.fr", "alexandre").then(
      () => {
        html_element.innerText = "Test échoué"
        html_element.style.color = "red"
        document.getElementById("tests").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test reussi: " + error.message
        html_element.style.color = "green"
        document.getElementById("tests").appendChild(html_element)
      }
    )
  }

  wrongCreateUser(){
    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: "Volcic",
      prenom: "Alexandre",
      pseudo: "volcica",
      email: "unit@testing.com",
      password: "volcica",
      isAdmin: true, isAuthor: true
    });
    let user = new User(signupForm)

    let html_element = document.createElement("p")
    html_element.id = "rightCreateUser";
    this.authService.createNewUser(user, signupForm.value.password).then(
      () => {
        html_element.innerText = "Test echoué"
        html_element.style.color = "red"
        document.getElementById("tests").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test reussi: " + error.message
        html_element.style.color = "green"
        document.getElementById("tests").appendChild(html_element)
      }
    )
  }
}
