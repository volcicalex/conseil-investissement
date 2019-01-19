import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private toastrService: ToastrService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      pseudo: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      isAdmin: false, isAuthor: false
    });
  }

  onSubmit() {
    const user = new User(this.signupForm)
    const password = this.signupForm.get('password').value   
    this.authService.createNewUser(user, password).then(
      () => {
        this.router.navigate(['/acceuil']);
      },
      (error) => {
        this.toastrService.error("Erreur dans la création")
      }
    );
  }

}
