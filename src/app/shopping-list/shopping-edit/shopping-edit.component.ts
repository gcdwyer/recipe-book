import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingListForm: NgForm;
  // used for subscribe/unsubscribe
  subscription: Subscription;
  // sets mode to false as default
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(
    private shoppingListService: ShoppingListService,
    private toastr: ToastsManager) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          // index passed in from for loop
          this.editedItemIndex = index;
          // changes mode to true
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          // sets values of input fields 
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    // if in edit mode
    if (this.editMode) {
      // execute update method
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // execute add method
      this.shoppingListService.addIngredient(newIngredient);
    }
    // pop up message on success
    this.toastr.success('Ingredient Added.', 'Success!');
    // reverts edit back to default state
    this.editMode = false;
    // resets form
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteItem() {
    // passes in the index of the edited item to delete
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    // pop up message on success
    this.toastr.success('Ingredient Deleted.', 'Success!');
    // clears the item
    this.onClearItem();
  }

  onClearItem() {
    // resets the form
    this.shoppingListForm.reset();
    // reverts edit back to default state
    this.editMode = false;
  }

}
