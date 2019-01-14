import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorieService } from 'src/app/services/categorie.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rubric } from 'src/app/models/rubric';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-rubric',
  templateUrl: './add-rubric.component.html',
  styleUrls: ['./add-rubric.component.css']
})
export class AddRubricComponent implements OnInit {

  rubric: Rubric

  postForm = new FormGroup({
    nom: new FormControl(''),
  });

  constructor(public dialogRef: MatDialogRef<AddRubricComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private categorieService: CategorieService,
              private toastr: ToastrService) { }

  ngOnInit() {}

  addNode(): void{
    this.rubric = new Rubric(this.postForm.value.nom)
    this.categorieService.addCategory(this.rubric).then(() => {this.toastr.success("Rubrique ajoutée"); this.dialogRef.close()})
  }

}
