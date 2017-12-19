import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    // name, description, imagePath
    new Recipe(
      'Recipe 1', 
      'Description 1', 
      'http://via.placeholder.com/350x150', 
      [
        new Ingredient('Ing1', 1),
        new Ingredient('Ing2', 5)
      ]),
    new Recipe(
      'Recipe 2', 
      'Description 2', 
      'http://via.placeholder.com/350x150',
    [
      new Ingredient('Ing3', 2),
      new Ingredient('Ing4', 6)
    ])
  ];

  constructor(private shoppingListService: ShoppingListService) {

  }

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
}