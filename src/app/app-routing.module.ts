import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";

const appRoutes: Routes =[
  // pathMatch used to for blank path because all paths contain the blank
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  // path displays recipes
  { path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: ':id', component: RecipeDetailComponent },
  ] },
  // path deisplays shopping list
  { path: 'shopping-list', component: ShoppingListComponent },
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