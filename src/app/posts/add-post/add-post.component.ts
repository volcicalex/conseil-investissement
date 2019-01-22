import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';
import { CategorieService } from 'src/app/services/categorie.service';
import { Rubric } from 'src/app/models/rubric';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  rubrics: Rubric[]

  post: Post
  indexCategorie: string

  postForm = new FormGroup({
    titre: new FormControl(''),
    resume: new FormControl(''),
    description: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddPostComponent>,
              private postService: PostService,
              private categorieService: CategorieService,
              private auth: AuthService) { }

  ngOnInit() {
    this.categorieService.getCategories().valueChanges()
      .subscribe((rubrics: Rubric[]) => {this.rubrics = rubrics; this.sortedRubrics(); this.indexCategorie = (rubrics.length-1).toString()})
  }

  sortedRubrics(): void{
    let f = function compare(a: Rubric, b: Rubric) {
      if (a.nom == "Tous") return 1
      else if (b.nom == "Tous") return -1  
      else if (a.nom < b.nom)
         return -1;
      else if (a.nom > b.nom)
         return 1;
      return 0;
    };
    this.rubrics.sort(f);
  }

  addPost(): void{
    let categorie = this.rubrics[parseInt(this.indexCategorie)]
    let auteur
    this.auth.user.map(user => {
      auteur = user
    }).subscribe( () => {
      this.post = new Post(this.postForm.value.titre, auteur,this.postForm.value.resume, this.postForm.value.description, "Finance")
      this.postService.editPost(this.post).then( () => this.dialogRef.close(true))
    })
  }
}
