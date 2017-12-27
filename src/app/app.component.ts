import { Component, OnInit } from '@angular/core';

// imports everything from firebase
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  ngOnInit() {
    // firebase key
    firebase.initializeApp({
      apiKey: "AIzaSyCyY55Gg3L4br1H0kFT4eKqO6cF33XqD78",
      authDomain: "recipe-book-45271.firebaseapp.com"
    });
  }
  
  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
