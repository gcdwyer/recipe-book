import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // name, description, imagePath
    new Recipe(
      'Samsung Smartthings Hub', 
      'The Samsung SmartThings hub can connect to more than 200 devices — more than most other hubs', 
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV71KhnasDgRXPnKik851dYgvivK29DG0s3ae1rvcFRL67mJhYqg', 
      [
        new Ingredient('Ing1', 1),
        new Ingredient('Ing2', 5)
      ]),
    new Recipe(
      'Amazon Echo Plus', 
      'Echo Plus is a simple way to start your smart homeand allows for simple and direct setup of compatible ZigBee devices', 
      'https://images-na.ssl-images-amazon.com/images/I/41-v1fozy0L._SY400_.jpg',
    [
      new Ingredient('Ing3', 2),
      new Ingredient('Ing4', 6)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  // returns the index of the recipes array && used in the recipe-detials component
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}