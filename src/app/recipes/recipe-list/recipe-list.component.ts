import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    // name, description, imagePath
    new Recipe('Recipe 1', 'Description 1', 'http://via.placeholder.com/350x150'),
    new Recipe('Recipe 1', 'Description 1', 'http://via.placeholder.com/350x150')
  ];

  constructor() { }

  ngOnInit() {
  }

}
