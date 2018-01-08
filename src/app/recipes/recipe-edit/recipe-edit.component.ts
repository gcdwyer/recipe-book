import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { RecipeService } from './../recipe.service';
import { Recipe } from '../recipe.model';

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
    private recipeService: RecipeService,
    private router: Router,
    private toastr: ToastsManager) {}

  getIngredients(recipeForm) {
    return recipeForm.get('ingredients').controls
  }  

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        // changes id string into number
        this.id = +params['id'];
        // sets edit mode to true if id exists
        this.editMode = params['id'] != null;
        console.log("editMode: " + this.editMode);
        // run initialize form
        this.initializeForm();
      }
    );
  }

  onSubmit() {
    // If in edit mode
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    // pop up message on success
    this.toastr.success('Recipe Saved.', 'Success!');
    this.onCancel();
  }

  // Add Ingredients
  onAddIngredient() {
    console.log("add ingredients clicked");
    // push new ingredients into array
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          // validates positive numbers
          Validators.pattern('^[1-9]+[0-9]*$')
        ])
      })
    )
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    // pop up message on success
    this.toastr.success('Ingredient Removed.', 'Success!');
  }

  // method to change route up a level
  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initializeForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeRating = '';
    let recipeIngredients = new FormArray([]);

    // if in edit mode
    if (this.editMode) {
      // set recipe to recipe selected
      let recipe = this.recipeService.getRecipe(this.id);
      // assign values with recipe selected
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      recipeRating = recipe.rating;

      // if recipe contains ingredients
      if (recipe['ingredients']) {
        // loop through all ingredients
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            // create new form group for each ingredient
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                // validates positive numbers
                Validators.pattern('^[1-9]+[0-9]*$')
              ])
            })
          ); 
        }
      } else {
        console.log("no ingredients");
      }
    }

    // pass this form into the DOM
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'rating': new FormControl(recipeRating, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  }