import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    // name, description, rating, imagePath
    new Recipe(
      'Creamy Chicken Pasta', 
      'Bring on the cheesy heartiness you adore with an Italian Chicken-Pasta Skillet! This better-for-you Italian Chicken-Pasta Skillet is full of flavor.',
      '8',
      'http://del.h-cdn.co/assets/16/26/980x551/gallery-1467150710-lemon-butter-chicken-pasta-04.jpg', 
      [
        new Ingredient('Pasta - 20 oz', 1),
        new Ingredient('Chicken Breast', 3),
        new Ingredient('Creamer - 8 oz', 1),
        new Ingredient('Onion - small', 1)
      ]),
    new Recipe(
      'Gyro with Tzatziki Sauce', 
      'A homemade gyros recipe that is so mouth-wateringly good, you will make it again and again.',
      '7.7',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/6/7/3/FNM_070111-WN-Dinners-014_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539853695.jpeg',
    [
      new Ingredient('Ground Lamb - 2 lbs', 1),
      new Ingredient('Rosemary - 1 bunch', 1),
      new Ingredient('Tzatziki Sauce - 6 oz', 1),
      new Ingredient('Garlic Clove', 3)
    ]),
    new Recipe(
      'Wrolds Best Lasagna', 
      'It takes a little work, but it is worth it.',
      '8.3',
      'http://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',
    [
      new Ingredient('Ground Italian Sausage - 0.5 lbs', 2),
      new Ingredient('Ground Beef - 0.5 lbs', 2),
      new Ingredient('Onion - small', 0.5),
      new Ingredient('Canned Tomatoes - 28 oz', 1),
      new Ingredient('Lasagna Noodes', 12)
    ]),
    new Recipe(
      'Chef Johns Perfect Prime Rib', 
      'This is a specific formula for achieving a perfectly pink prime rib cooked somewhere a shade under medium rare.',
      '8.7',
      'http://images.media-allrecipes.com/userphotos/720x405/1876731.jpg',
    [
      new Ingredient('Prime Rib Roast - 1 lbs', 4),
      new Ingredient('Butter - 0.25 cup', 1),
      new Ingredient('Ground Black Pepper - 1 tlbs', 1)
    ]),
    new Recipe(
      'Chicken Parmesan', 
      'My version of chicken parmesan is a little different than what they do in the restaurants, with less sauce and a crispier crust.',
      '8.4',
      'http://images.media-allrecipes.com/userphotos/720x405/1036363.jpg',
    [
      new Ingredient('Chicken Breast', 4),
      new Ingredient('Eggs', 2),
      new Ingredient('Bread Crumbs - 0.25 cup', 4),
      new Ingredient('Mozzarella - 6 oz', 1),
      new Ingredient('Basil - 0.25 cup', 1)
    ]),
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