import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeEditComponent } from '../recipe-edit/recipe-edit.component';

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
    private router: Router,
    private toastr: ToastsManager
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

  // add ingredients to shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
    console.log("added to shopping cart");
    this.toastr.success('Added ingredients.', 'Success!');
  }

  // edit a recipe
  onEditRecipe() {
    // routes to edit
    this.router.navigate(['edit'], {relativeTo: this.route});
    console.log("edit recipe if logged in");
  }

  // delete recipe
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    // routes to recipes
    this.router.navigate(['/recipes']);
    console.log("delete recipe");
    this.toastr.success('Deleted recipe.', 'Success!');
  }

}
        