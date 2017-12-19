import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    // subscribes to the params and looks for any changes
    this.route.params.subscribe(
      (params: Params) => {
        // value returned is string. "+" will chnage to number
        this.id = +params['id'];
        // uses the index from the getRecipe method
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
  }

  // method to add ingredients to shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  // method to edit a recipe
  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
        