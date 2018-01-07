import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';


@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  result: any;

  private recipes: Recipe[] = [
    // name, description, rating, imagePath
    new Recipe(
      'top',
      'Creamy Chicken Pasta', 
      'This chicken alfredo recipe is really unique as it doesnt use a thickening agent, and is very versatile.',
      '8',
      'http://del.h-cdn.co/assets/16/26/980x551/gallery-1467150710-lemon-butter-chicken-pasta-04.jpg', 
      [
        new Ingredient('Pasta - oz', 20),
        new Ingredient('Chicken Breast', 3),
        new Ingredient('Creamer - oz', 8),
        new Ingredient('Onion - small', 1)
      ]),
    new Recipe(
      'top',
      'Gyro with Tzatziki Sauce', 
      'A homemade gyros recipe that is so mouth-wateringly good, you will make it again and again.',
      '7.7',
      'http://food.fnr.sndimg.com/content/dam/images/food/fullset/2011/6/7/3/FNM_070111-WN-Dinners-014_s4x3.jpg.rend.hgtvcom.616.462.suffix/1382539853695.jpeg',
    [
      new Ingredient('Ground Lamb - lbs', 2),
      new Ingredient('Rosemary - bunch', 1),
      new Ingredient('Tzatziki Sauce - oz', 6),
      new Ingredient('Garlic Clove', 3)
    ]),
    new Recipe(
      'top',
      'Wrolds Best Lasagna', 
      'It takes a little work, but it is worth it.',
      '8.3',
      'http://images.media-allrecipes.com/userphotos/720x405/3359675.jpg',
    [
      new Ingredient('Ground Italian Sausage - lbs', 1),
      new Ingredient('Ground Beef - lbs', 0.5),
      new Ingredient('Onion - cup', 0.5),
      new Ingredient('Canned Tomatoes - oz', 28),
      new Ingredient('Lasagna Noodes', 12)
    ]),
    new Recipe(
      'top',
      'Chef Johns Perfect Prime Rib', 
      'This is a specific formula for achieving a perfectly pink prime rib cooked somewhere a shade under medium rare.',
      '8.7',
      'http://images.media-allrecipes.com/userphotos/720x405/1876731.jpg',
    [
      new Ingredient('Prime Rib Roast - lbs', 4),
      new Ingredient('Butter - cup', 0.25),
      new Ingredient('Ground Black Pepper - tlbs', 1)
    ]),
    new Recipe(
      'top',
      'Chicken Parmesan', 
      'My version of chicken parmesan is a little different than what they do in the restaurants, with less sauce and a crispier crust.',
      '8.4',
      'http://images.media-allrecipes.com/userphotos/720x405/1036363.jpg',
    [
      new Ingredient('Chicken Breast', 4),
      new Ingredient('Eggs', 2),
      new Ingredient('Bread Crumbs - cup', 0.25),
      new Ingredient('Mozzarella - oz', 6),
      new Ingredient('Basil - cup', 0.25)
    ]),
    new Recipe(
      'mexican',
      'Slow Cooker Chicken Taco Soup', 
      'You can call this soup or chili, but either way it is wonderful.',
      '9.2',
      'http://images.media-allrecipes.com/userphotos/720x405/3706561.jpg',
    [
      new Ingredient('Chicken Breast', 3),
      new Ingredient('Onion - cup', 1),
      new Ingredient('Black Beans - oz', 8),
      new Ingredient('Chili Beans - oz', 8),
      new Ingredient('Tomato Sauce - oz', 8),
      new Ingredient('Cheddar Cheese - oz', 4)
    ]),
    new Recipe(
      'mexican',
      'Angelas Awesome Enchiladas', 
      'The secret is in the seasonings! I whipped these up on my own using stuff I had on hand.',
      '9.0',
      'http://images.media-allrecipes.com/userphotos/720x405/683438.jpg',
    [
      new Ingredient('Chicken Breast', 2),
      new Ingredient('Onion - cup', 1),
      new Ingredient('Sour Cream - oz', 1),
      new Ingredient('Chili Powder - tsp', 1),
      new Ingredient('Tomato Sauce - oz', 8),
      new Ingredient('Cheddar Cheese - oz', 8),
      new Ingredient('Tortillas', 5)
    ])
  ];

  constructor(
    private shoppingListService: ShoppingListService,
    private _http: Http) {}

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