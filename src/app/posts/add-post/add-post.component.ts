import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  post: Post

  postForm = new FormGroup({
    titre: new FormControl(''),
    resume: new FormControl(''),
    description: new FormControl(''),
    categorie: new FormControl('')
  });

  constructor(public dialogRef: MatDialogRef<AddPostComponent>,
              private postService: PostService,
              private auth: AuthService) { }

  ngOnInit() {}

  addPost(): void{
    let auteur
    this.auth.user.map(user => {
      auteur = user
    }).subscribe( () => {
      this.post = new Post(this.postForm.value.titre, auteur,this.postForm.value.resume, this.postForm.value.description)
      this.postService.editPost(this.post).then( () => this.dialogRef.close(true))
    })
  }
}
