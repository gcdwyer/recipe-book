import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";

@Injectable()
export class DataStorageService {
  constructor(private http: Http, private recipeService: RecipeService) {}

  storeRecipes() {
    // update to DB
    return this.http.put('https://recipe-book-45271.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    // get from DB
    this.http.get('https://recipe-book-45271.firebaseio.com/recipes.json')
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          // loop through recipes
          for (let recipe of recipes) {
            // if ingredients do not exist
            if (!recipe['ingredients']) {
              console.log(recipe);
              // create place holder for them
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}