import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { AuthGuard } from '../../auth/auth-guard.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // subscribes and looks for changes
    this.subscription = this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy() {
    // unsubscribes from subscription
    this.subscription.unsubscribe();
  }
  
  onNewRecipe() {
    // sets route to recipes/new
    this.router.navigate(['new'], {relativeTo: this.route});
    console.log("new recipe if logged in");
    // this.toastr.warning('User Not Logged In.', 'Warning!');
    
    
  }

  
}
