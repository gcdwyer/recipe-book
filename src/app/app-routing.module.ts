import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from "./auth/signup/signup.component";

const appRoutes: Routes =[
  // pathMatch used to for blank path because all paths contain the blank
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // path displays recipes
  { path: 'recipes', component: RecipesComponent, children: [
    // childen path of recipes
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    // dynamic paramaters must be ordered last
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent },
  ] },
  // path deisplays shopping list
  { path: 'shopping-list', component: ShoppingListComponent },
  // pth to signup
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  // adds routes to the angular router
  imports: [RouterModule.forRoot(appRoutes)],
  // exports to the app module
  exports: [RouterModule]
})
// exports to the app.module
export class AppRoutingModule {

}