import { Component } from '@angular/core';
import * as firebase from 'firebase';
import 'hammerjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'conseil-investissement';

  constructor(){
    var config = {
      apiKey: "AIzaSyBqBUOOdrWhuktsaHPu86ly__GrMhN39H8",
      authDomain: "conseil-investissement.firebaseapp.com",
      databaseURL: "https://conseil-investissement.firebaseio.com",
      projectId: "conseil-investissement",
      storageBucket: "conseil-investissement.appspot.com",
      messagingSenderId: "473414439421"
    };
    firebase.initializeApp(config);
  }
}
