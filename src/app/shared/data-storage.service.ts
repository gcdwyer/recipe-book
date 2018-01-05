import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import 'rxjs/Rx';

import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

@Injectable()
export class DataStorageService {
  constructor(
    private http: Http, 
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();

    // update recipes to DB
    return this.http.put('https://recipe-book-45271.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  storeIngredients() {
    const token = this.authService.getToken();
    
    // update shopping list to DB
    return this.http.put('https://recipe-book-45271.firebaseio.com/shoppinglist.json?auth=' + token, this.shoppingListService.getIngredients());
  }

  getRecipes() {
    const token = this.authService.getToken();

    // get from DB
    this.http.get('https://recipe-book-45271.firebaseio.com/recipes.json?auth=' + token)
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

  // getIngredients() {
  //   const token = this.authService.getToken();

  //   // get from DB
  //   this.http.get('https://recipe-book-45271.firebaseio.com/shoppinglist.json?auth=' + token)
  //     .map(
  //       (response: Response) => {
  //         const ingredients: any = response.json();
  //         // loop through recipes
  //         // for (let ingredient of ingredients) {
  //           // if ingredients do not exist
  //           // if (!recipe['ingredients']) {
  //           //   console.log(recipe);
  //           //   // create place holder for them
  //           //   recipe['ingredients'] = [];
  //           // }
  //         // }
  //         return ingredients;
  //       }
  //     )
  //     .subscribe(
  //       (ingredients: any) => {
  //         // this.recipeService.setRecipes(recipes);
  //       }
  //     );
  // }
}