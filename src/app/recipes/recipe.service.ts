import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [
    // name, description, imagePath
    new Recipe('Recipe 1', 'Description 1', 'http://via.placeholder.com/350x150'),
    new Recipe('Recipe 2', 'Description 2', 'http://via.placeholder.com/350x150')
  ];

  getRecipes() {
    return this.recipes.slice();
  }
}