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

  // Food2Fork
  // key: 8199fab535e7376cd63a5c226f1e28d4 
  // url = API_URL_BASE + "/search?key=" + API_KEY + "&q=" + URLEncoder.encode(query, "UTF-8");
  // http://food2fork.com/api/search/search?key=8199fab535e7376cd63a5c226f1e28d4&q=apple

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
