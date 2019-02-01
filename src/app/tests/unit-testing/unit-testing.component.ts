import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user';
import { CategorieService } from '../../services/categorie.service';
import * as firebase from 'firebase';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { Commentaire } from '../../models/commentaire';
import { PostService } from 'src/app/services/post.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { Post } from '../../models/post';

@Component({
  selector: 'app-unit-testing',
  templateUrl: './unit-testing.component.html',
  styleUrls: ['./unit-testing.component.css']
})
export class UnitTestingComponent implements OnInit {

  constructor(private authService: AuthService, 
              private catService: CategorieService,
              private comService: CommentaireService,
              private postService: PostService    
              ) { }

  ngOnInit() {
    this.rightSignIn()
    this.wrongSignIn()
    this.createUser() 
    this.canManage()

    this.canEdit()   
    this.cantEdit()
    this.canDelete()
    this.cantDelete()
    this.addCategory()
    this.deleteCategory()

    this.canEditCom()
    this.cantEditCom()
    this.canDeleteCom()
    this.cantDeleteCom()
    this.editComment()
    this.deleteComment()

    this.canReadPost()
    this.canEditPost()
    this.cantEditPost()
    this.canDeletePost()
    this.cantDeletePost()
    this.editPost()
    this.deletePost()
  }

  /* Tests des services d'authentification */
  rightSignIn(){
    let html_element = document.createElement("p")
    html_element.id = "rightSignIn";
    this.authService.signInUser("unit@testing.com", "unittesting").then(
      () => {
        html_element.innerText = "Test validé : connexion réussie"
        html_element.style.color = "green"
        document.getElementById("connexion").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: '" + error.message +" '"
        html_element.style.color = "red"
        document.getElementById("connexion").appendChild(html_element)
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
        document.getElementById("connexion").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test validé : erreur de connexion levée : '" + error.message +" '"
        html_element.style.color = "green"
        document.getElementById("connexion").appendChild(html_element)
      }
    )
  }

  createUser(){
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
    html_element.id = "wrongCreateUser";
    this.authService.createNewUser(user, signupForm.value.password).then(
      () => {
        html_element.innerText = "Test echoué"
        html_element.style.color = "red"
        document.getElementById("connexion").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test validé : erreur d'inscription levée : '" + error.message +" '"
        html_element.style.color = "green"
        document.getElementById("connexion").appendChild(html_element)
      }
    )
  }

  canManage(){
    let html_element = document.createElement("p");
    html_element.id = "canManage";

    this.authService.userRoles =  ['admin'];

    if (this.authService.canManage()) {
      html_element.innerText = "Test validé : admin peut gérer les utilisateurs";
      html_element.style.color = "green";
      document.getElementById("connexion").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin ne peut pas éditer catégories";
      html_element.style.color = "red";
      document.getElementById("connexion").appendChild(html_element);
    }
  }

  
  /* Tests des services pour les catégories */

  canEdit(){
    let html_element = document.createElement("p");
    html_element.id = "canEdit";

    this.catService.userRoles =  ['admin'];

    if (this.catService.canEdit()) {
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
    html_element.id = "cantEdit";

    this.catService.userRoles =  ['reader']

    if (!this.catService.canEdit()) {
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
    html_element.id = "canDelete";

    this.catService.userRoles =  ['admin']

    if (this.catService.canDelete()) {
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
    html_element.id = "cantDelete";

    this.catService.userRoles =  ['reader']

    if (!this.catService.canDelete()) {
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

  addCategory() {
    let html_element = document.createElement("p");
    html_element.id = "addCategory";

    this.catService.userRoles =  ['admin']
    this.catService.addCategory("Lectures")

    this.catService.getCategories().valueChanges().subscribe(
      (data:any) => {
        if(data.Lectures != undefined){
        html_element.innerText = "Test validé : ajout de catégorie"
        html_element.style.color = "green"
        document.getElementById("categories").appendChild(html_element)
    } else {
      html_element.innerText = "Test échoué : categorie non ajoutee"
      html_element.style.color = "red"
      document.getElementById("categories").appendChild(html_element)
    }
  })
  
  }

  deleteCategory(){

    let html_element = document.createElement("p");
    html_element.id = "deleteCategory";

    let html_element2 = document.createElement("p");
    html_element2.id = "deleteCategory";

    this.catService.userRoles =  ['admin']

    this.catService.addCategory("toDelete")

    this.catService.deleteCategory("", "toDelete")
    this.catService.getCategories().valueChanges().subscribe(
      (data:any) => {if(data.toDelete == undefined){
        html_element2.innerText = "Test validé : suppression de catégorie"
        html_element2.style.color = "green"
        document.getElementById("categories").appendChild(html_element2)
      } else {
        html_element2.innerText = "Test échoué : categorie non supprimee"
        html_element2.style.color = "red"
        document.getElementById("categories").appendChild(html_element2)
      }
    })
  }

    /* Tests des services pour les sommentaires */


  canEditCom(){
    let html_element = document.createElement("p");
    html_element.id = "canEditCom";

    this.comService.userRoles =  ['admin', 'author'];

    if (this.comService.canEdit()) {
      html_element.innerText = "Test validé : admin/auteur peut éditer commentaires";
      html_element.style.color = "green";
      document.getElementById("commentaires").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin/auteur ne peut pas éditer commentaires";
      html_element.style.color = "red";
      document.getElementById("commentaires").appendChild(html_element);
    }
  }

  cantEditCom(){
    let html_element = document.createElement("p");
    html_element.id = "cantEditCom";

    this.comService.userRoles =  ['reader']

    if (!this.comService.canEdit()) {
      html_element.innerText = "Test validé : lecteur ne peut pas éditer commentaires";
      html_element.style.color = "green";
      document.getElementById("commentaires").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut éditer catégories";
      html_element.style.color = "red";
      document.getElementById("commentaires").appendChild(html_element);
    }
  }

  canDeleteCom(){
    let html_element = document.createElement("p");
    html_element.id = "canDeleteCom";

    this.comService.userRoles =  ['admin']

    if (this.comService.canDelete()) {
      html_element.innerText = "Test validé : admin peut supprimer commentaires";
      html_element.style.color = "green";
      document.getElementById("commentaires").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin ne peut pas supprimer commentaires";
      html_element.style.color = "red";
      document.getElementById("commentaires").appendChild(html_element);
    }
  }

  cantDeleteCom(){
    let html_element = document.createElement("p");
    html_element.id = "cantDeleteCom";

    this.comService.userRoles =  ['reader']

    if (!this.comService.canDelete()) {
      html_element.innerText = "Test validé : lecteur ne peut pas supprimer commentaires";
      html_element.style.color = "green";
      document.getElementById("commentaires").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut supprimer commentaires";
      html_element.style.color = "red";
      document.getElementById("commentaires").appendChild(html_element);
    }
  }
  
  editComment(){
    let html_element = document.createElement("p");
    html_element.id = "editComment";
    let html_element2 = document.createElement("p");
    html_element2.id = "editComment2";


    let formBuilder = new FormBuilder()
    let signupForm = formBuilder.group({
      nom: "CommentateurTest",
      prenom: "CommentateurTest",
      pseudo: "CommentateurTest",
      email: "CommentateurTest@mail.com",
      password: "CommentateurTest",
      isAdmin: true, isAuthor: true
    });
    let user = new User(signupForm)
    let comment : object;
    let commentaire = new Commentaire("listComment/aim544rvb/", comment)
    commentaire.id = "idCommentTestGH712IYGVBED8"
    commentaire.auteur = user
    commentaire.texte = "Ceci est un nouveau commentaire"
    commentaire.idsFather = "listComment/aim544rvb/"
    this.comService.editComment("1kb1x65en", commentaire).then(
      () => {
        html_element.innerText = "Test validé : création commentaire "
        html_element.style.color = "green"
        document.getElementById("commentaires").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: '" + error.message +" '"
        html_element.style.color = "red"
        document.getElementById("commentaires").appendChild(html_element)
      }
    )
    commentaire.texte = "Ceci est un nouveau commentaire modifié"
    commentaire.idsFather = "listComment/aim544rvb/"
    this.comService.editComment("1kb1x65en", commentaire).then(
      () => {
        html_element2.innerText = "Test validé : modification commentaire"
        html_element2.style.color = "green"
        document.getElementById("commentaires").appendChild(html_element2)
      },
      (error) => {
        html_element2.innerText = "Test échoué: '" + error.message +" '"
        html_element2.style.color = "red"
        document.getElementById("commentaires").appendChild(html_element2)
      }
    )
  }

  deleteComment(){
    let html_element = document.createElement("p");
    html_element.id = "deletCom";
    let html_element2 = document.createElement("p");
    html_element2.id = "deletCom";


    let formBuilder = new FormBuilder()
    let signupForm = formBuilder.group({
      nom: "CommentateurTest",
      prenom: "CommentateurTest",
      pseudo: "CommentateurTest",
      email: "CommentateurTest@mail.com",
      password: "CommentateurTest",
      isAdmin: true, isAuthor: true
    });
    let user = new User(signupForm)
    let comment : object;
    let commentaire = new Commentaire("listComment/aim544rvb/", comment)
    commentaire.id = "idCommentTestDELETE"
    commentaire.auteur = user
    commentaire.texte = "Ceci est un nouveau commentaire"
    commentaire.idsFather = "listComment/aim544rvb/"
    this.comService.editComment("1kb1x65en", commentaire).then(
      () => {
        html_element.innerText = "Test validé : création commentaire (2)"
        html_element.style.color = "green"
        document.getElementById("commentaires").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: '" + error.message +" '"
        html_element.style.color = "red"
        document.getElementById("commentaires").appendChild(html_element)
      }
    )
    this.comService.deleteComment("1kb1x65en", "listComment/aim544rvb/idCommentTestDELETE").then(
      () => {
        html_element2.innerText = "Test validé : suppression commentaire"
        html_element2.style.color = "green"
        document.getElementById("commentaires").appendChild(html_element2)
      },
      (error) => {
        html_element2.innerText = "Test échoué: '" + error.message +" '"
        html_element2.style.color = "red"
        document.getElementById("commentaires").appendChild(html_element2)
      }
    )
  }

      /* Tests des services pour les posts */


  canReadPost(){
    let html_element = document.createElement("p");
    html_element.id = "canReadPost";

    this.postService.userRoles =  ['admin', 'author', 'reader'];

    if (this.postService.canRead()) {
      html_element.innerText = "Test validé : admin/auteur/lecteur peut lire posts";
      html_element.style.color = "green";
      document.getElementById("posts").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin/auteur/lecteur ne peut pas lire posts";
      html_element.style.color = "red";
      document.getElementById("posts").appendChild(html_element);
    }
  }

  canEditPost(){
    let html_element = document.createElement("p");
    html_element.id = "canEditPost";

    this.postService.userRoles =  ['admin', 'author'];

    if (this.postService.canEdit()) {
      html_element.innerText = "Test validé : admin/auteur peut éditer posts";
      html_element.style.color = "green";
      document.getElementById("posts").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin/auteur ne peut pas éditer posts";
      html_element.style.color = "red";
      document.getElementById("posts").appendChild(html_element);
    }
  }

  cantEditPost(){
    let html_element = document.createElement("p");
    html_element.id = "cantEditPost";

    this.postService.userRoles =  ['reader']

    if (!this.postService.canEdit()) {
      html_element.innerText = "Test validé : lecteur ne peut pas éditer posts";
      html_element.style.color = "green";
      document.getElementById("posts").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut éditer posts";
      html_element.style.color = "red";
      document.getElementById("posts").appendChild(html_element);
    }
  }

  canDeletePost(){
    let html_element = document.createElement("p");
    html_element.id = "canDeletePost";

    this.postService.userRoles =  ['admin']

    if (this.postService.canDelete()) {
      html_element.innerText = "Test validé : admin peut supprimer posts";
      html_element.style.color = "green";
      document.getElementById("posts").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : admin ne peut pas supprimer posts";
      html_element.style.color = "red";
      document.getElementById("posts").appendChild(html_element);
    }
  }

  cantDeletePost(){
    let html_element = document.createElement("p");
    html_element.id = "cantDeletePost";

    this.postService.userRoles =  ['reader']

    if (!this.postService.canDelete()) {
      html_element.innerText = "Test validé : lecteur ne peut pas supprimer posts";
      html_element.style.color = "green";
      document.getElementById("posts").appendChild(html_element);
    }
    else {
      html_element.innerText = "Test échoué : lecteur peut supprimer posts";
      html_element.style.color = "red";
      document.getElementById("posts").appendChild(html_element);
    }
  }
  

  editPost(){

    let html_element = document.createElement("p");
    html_element.id = "editPost";
    let html_element2 = document.createElement("p");
    html_element2.id = "editPost2";

    let formBuilder = new FormBuilder()
    let signupForm = formBuilder.group({
      nom: "Dupont",
      prenom: "Pierre",
      pseudo: "pdupont",
      email: "pdupont@mail.com",
      password: "redacteurTest",
      isAdmin: false, isAuthor: true
    });
    let user = new User(signupForm)
    let titre = "Ces fonds qui s'intéressent au marché boursier le plus détesté du monde"
    let description = "Si l'on devait faire un classement des marchés actions préférés des investisseurs, \
    il serait sans doute dans les profondeurs : le marché britannique n'a plus vraiment la cote. \
    « C'est le marché le plus détesté », s'exclame Frédéric Rollin, chez Pictet AM. \
    C'est d'ailleurs ce que montre le sondage de janvier de Bank of America Merrill Lynch auprès de gérants \
    d'actifs. Ceux-ci sont sous-pondérés sur les actions britanniques à un niveau quasiment jamais vu depuis \
    vingt ans. La faute au Brexit . Depuis le vote du 23 juin 2016, le Royaume-Uni symbolise le risque politique\
    en Europe auprès des investisseurs étrangers. Si la Bourse britannique s'est montrée soulagée, mercredi,\
    par le soutien offert à Theresa May par le parlement pour rediscuter l'accord de retrait avec Bruxelles \
    (le Footsie 100 a pris 1,7 %), rares sont les gérants à oser parier sur l'issue du Brexit."
    let resume = "Les incertitudes autour du Brexit ont fait fuir les investisseurs de la Bourse de Londres. Pour certains gérants, le désamour paraît excessif."
    let categorie = "Finance"
    let post = new Post(titre, user, description, resume, categorie)
    
    this.postService.editPost(post).then(
      () => {
        html_element.innerText = "Test validé : création d'un post "
        html_element.style.color = "green"
        document.getElementById("posts").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: '" + error.message +" '"
        html_element.style.color = "red"
        document.getElementById("posts").appendChild(html_element)
      }
    )
    post.description += "Ce désamour trouve sa traduction au niveau des valorisations. Le ratio de capitalisation des \
    bénéfices du Footsie 100 est tombé en début d'année à moins de 12 fois, quand il trônait à près de 18 fois \
    en septembre 2016. Idem pour la capitalisation de l'actif net. « Le 'price to book' est au plus bas depuis \
    un an et, compte tenu de la baisse de la livre, il est sur un niveau extrêmement faible, d'un point de vue \
    historique, au total comparable à celui observé lors de la crise de change des années 1990 », observe \
    Frédéric Rollin, qui a fait des actions britanniques l'un de ses paris forts pour 2019. Et il n'est pas \
    le seul. En décembre, Morgan Stanley constatait que la valorisation de la Bourse de Londres était au plus \
    bas depuis 2010, relativement au reste du monde. « Les actions britanniques sont si peu chères et \
    tellement mal aimées qu'elles méritent qu'on y jette un deuxième regard. » Pour la banque américaine,\
    « malgré les incertitudes sur le Brexit », ce marché pourrait être « le gagnant surprise de 2019 sur \
    les marchés développés »."
    this.postService.editPost(post).then(
      () => {
        html_element2.innerText = "Test validé : modification post "
        html_element2.style.color = "green"
        document.getElementById("posts").appendChild(html_element2)
      },
      (error) => {
        html_element2.innerText = "Test échoué: '" + error.message +" '"
        html_element2.style.color = "red"
        document.getElementById("posts").appendChild(html_element2)
      }
    )
    this.postService.deletePost(post.id)

  }

  deletePost(){

    let html_element = document.createElement("p");
    html_element.id = "deletPost";
    let html_element2 = document.createElement("p");
    html_element2.id = "deletPost2";


    let formBuilder = new FormBuilder()
    let signupForm = formBuilder.group({
      nom: "redacteurTest",
      prenom: "redacteurTest",
      pseudo: "redacteurTest",
      email: "redacteurTest@mail.com",
      password: "redacteurTest",
      isAdmin: false, isAuthor: true
    });
    let user = new User(signupForm)
    let titre = "Titre d'un post de test"
    let description = "Description d'un post de test"
    let resume = "Resume d'un post de test"
    let categorie = "Finance"
    let post = new Post(titre, user, description, resume, categorie)
    
    this.postService.editPost(post).then(
      () => {
        html_element.innerText = "Test validé : création d'un post (2)"
        html_element.style.color = "green"
        document.getElementById("posts").appendChild(html_element)
      },
      (error) => {
        html_element.innerText = "Test échoué: '" + error.message +" '"
        html_element.style.color = "red"
        document.getElementById("posts").appendChild(html_element)
      }
    )
    this.postService.deletePost(post.id).then(
      () => {
        html_element2.innerText = "Test validé : suppression post"
        html_element2.style.color = "green"
        document.getElementById("posts").appendChild(html_element2)
      },
      (error) => {
        html_element2.innerText = "Test échoué: '" + error.message +" '"
        html_element2.style.color = "red"
        document.getElementById("posts").appendChild(html_element2)
      }
    )

  }

}
