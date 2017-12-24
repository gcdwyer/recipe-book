import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { RecipeService } from './../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService) { 

    }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // sets edit mode to boolean
        this.editMode = params['id'] != null;
        console.log("editMode: " + this.editMode);
        this.initializeForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initializeForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescripiton = '';
    let recipeIngredients = new FormArray([]);

    // if in edit mode
    if (this.editMode) {
      // set recipe to recipe selected
      let recipe = this.recipeService.getRecipe(this.id);
      // assign values with recipe selected
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescripiton = recipe.description;

      // if recipe contains ingredients
      if (recipe['ingredients']) {
        // loop through all ingredients
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            // create new form group for each ingredient
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          ); 
        }
      } else {
        console.log("no ingredients");
      }
    }

    // pass this form into the DOM
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescripiton),
      'ingredients': recipeIngredients
    });
  }

}
