import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CategorieService } from '../../services/categorie.service';

@Component({
  selector: 'app-unit-testing',
  templateUrl: './unit-testing.component.html',
  styleUrls: ['./unit-testing.component.css']
})
export class UnitTestingComponent implements OnInit {

  constructor(private authService: AuthService, 
              private catService: CategorieService
    ) { }

  ngOnInit() {
    this.wrongSignIn();
    this.canEdit();
    this.cantEdit();
    this.canDelete();
    this.cantDelete();
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
        document.getElementById("connexion").appendChild(html_element)
      }
    )
  }

  
  /* Tests des services pour les catégories */

  canEdit(){
    let html_element = document.createElement("p");
    html_element.id = "canEdit";

    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: 'testUser',
      prenom: 'testUser',
      pseudo: 'testUser',
      email: 'testUser@mail.com',
      password: 'testUser',
      isAdmin: true, isAuthor: true
    });
    let user = new User(signupForm);
    if (this.catService.canEdit) {
      html_element.innerText = "Test validé : admin peut éditer catégories";
      html_element.style.color = "green";
      document.getElementById("categories").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin ne peut pas éditer catégories";
      html_element.style.color = "red";
      document.getElementById("categories").appendChild(html_element);
    }
  }

  cantEdit(){
    let html_element = document.createElement("p");
    html_element.id = "canEdit";

    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: 'testUser',
      prenom: 'testUser',
      pseudo: 'testUser',
      email: 'testUser@mail.com',
      password: 'testUser',
      isAdmin: false, isAuthor: false
    });
    let user = new User(signupForm);
    if (this.catService.canEdit) {
      html_element.innerText = "Test validé : lecteur ne peut pas éditer catégories";
      html_element.style.color = "green";
      document.getElementById("categories").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut éditer catégories";
      html_element.style.color = "red";
      document.getElementById("categories").appendChild(html_element);
    }
  }

  canDelete(){
    let html_element = document.createElement("p");
    html_element.id = "canEdit";

    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: 'testUser',
      prenom: 'testUser',
      pseudo: 'testUser',
      email: 'testUser@mail.com',
      password: 'testUser',
      isAdmin: true, isAuthor: true
    });
    let user = new User(signupForm);
    if (this.catService.canDelete) {
      html_element.innerText = "Test validé : admin peut supprimer catégories";
      html_element.style.color = "green";
      document.getElementById("categories").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin ne peut pas supprimer catégories";
      html_element.style.color = "red";
      document.getElementById("categories").appendChild(html_element);
    }
  }

  cantDelete(){
    let html_element = document.createElement("p");
    html_element.id = "canEdit";

    let formBuilder = new FormBuilder();
    let signupForm = formBuilder.group({
      nom: 'testUser',
      prenom: 'testUser',
      pseudo: 'testUser',
      email: 'testUser@mail.com',
      password: 'testUser',
      isAdmin: false, isAuthor: false
    });
    let user = new User(signupForm);
    if (this.catService.canDelete) {
      html_element.innerText = "Test validé : lecteur ne peut pas supprimer catégories";
      html_element.style.color = "green";
      document.getElementById("categories").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut supprimer catégories";
      html_element.style.color = "red";
      document.getElementById("categories").appendChild(html_element);
    }
  }



}
